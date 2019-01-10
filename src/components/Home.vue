<template>
<div>
    <div class="ui stackable grid vertically padded container">
            <MyHeader 
                :user="user"
                :ifLogged="ifLogged"
            />
            
        <div class="sixteen wide column">
            <img class="ui fluid rounded image main-image" src="/static/nba201819.jpeg">
            <div class="ui container section-header">
                <h1 class="ui center aligned header">NBA Fantasy League</h1>
            </div>

            <h2 class="ui medium dividing header">NBA Teams</h2>
            <div class="ui stackable grid container">
                <div class="eight wide column">
                    <div class="ui segment">
                        <OfficialTeams
                            :teams.sync="westTeams"
                        />
                    </div>
                </div>
                <div class="eight wide column">
                    <div class="ui segment">
                        <OfficialTeams
                            :teams.sync="eastTeams"
                        />
                    </div>
                </div>
            </div>
            <div class="ui segment">
                <h2 class="ui medium dividing header">League Leaders</h2>
                <div class="ui stackable grid container">
                <div class="five wide column">
                    <div class="ui segment">
                        <h2 class="ui medium dividing header">Points</h2>
                        <Players
                            :players.sync="pointsLeaders"
                        />
                    </div>
                </div>
                <div class="five wide column">
                    <div class="ui segment">
                        <h2 class="ui medium dividing header">Assists</h2>
                        <Players
                            :players.sync="asistsLeaders"
                        />
                    </div>
                </div>
                <div class="five wide column">
                    <div class="ui segment">
                        <h2 class="ui medium dividing header">Rebounds</h2>
                        <Players
                            :players.sync="reboundsLeaders"
                        />
                    </div>
                </div>
            </div>
            </div>
            <div class="ui segment">
                <h2 class="ui medium dividing header">Fantasy Teams</h2>

                <FantasyTeams
                    :teams.sync="fantasyTeams"
                />
            </div>
            <div class="ui segment">
                <h2 class="ui medium dividing header">About Author</h2>
                <div>
                    <p>Piotr Woś</p>
                    <p>Wydział Fizyki i Informatyki Stosowanej</p>
                    <p>Informatyka Stosowana III rok</p>
                    <p>AGH Kraków</p>
                </div>
            </div>
        </div>
    </div>
    <footer class="ui row grid">
        <div class="blue column">
            <h3 class="ui center aligned header">2019</h3>
        </div>
    </footer>
</div>
</template>

<script>
    import MyHeader from '@/components/MyHeader'
    import Players from '@/components/Player/Players'
    import OfficialTeams from '@/components/OfficialTeam/OfficialTeams'
    import FantasyTeams from '@/components/FantasyTeam/FantasyTeams'

    export default {
        name: 'Home',
        components: {
            MyHeader,
            Players,
            OfficialTeams,
            FantasyTeams
        },
        data () {
            return {
                ifLogged: false,
                user: {},
                players: [],
                teams: [],
                fantasyTeams: [],
                pointsLeaders: [],
                asistsLeaders: [],
                reboundsLeaders: [],
            }
        },
        created () {
            const token = localStorage.getItem('token')
            if(token) {
                this.fetchAuthenticatedUser(token)
            }
            this.fetchOfficialTeams()
            this.fetchFantasyTeams()
            this.fetchLeagueLeadersPoints()
            this.fetchLeagueLeadersAsists()
            this.fetchLeagueLeadersRebounds()
        },
        methods: {
            fetchAuthenticatedUser (token) {
                axios
                    .get('/users/me', {
                        headers: {
                            'x-access-token': `${token}`
                        }
                    })
                    .then(response => {
                        this.ifLogged = true
                        this.user = response.data.data
                    })
            },
            fetchOfficialTeams () {
                axios
                    .get('/official-teams')
                    .then(response => {
                        this.teams = response.data.allTeams
                    })
            },
            fetchFantasyTeams () {
                axios
                    .get('/fantasy-teams')
                    .then(response => {
                        this.fantasyTeams = response.data.fantasyTeams
                    })
            },
            fetchLeagueLeadersPoints () {
                axios.get('/players/league-leaders/points')
                    .then(response => {
                        this.pointsLeaders = response.data.players
                    })
            },
            fetchLeagueLeadersAsists () {
                axios.get('/players/league-leaders/asists')
                    .then(response => {
                        this.asistsLeaders = response.data.players
                    })
            },
            fetchLeagueLeadersRebounds () {
                axios.get('/players/league-leaders/rebounds')
                    .then(response => {
                        this.reboundsLeaders = response.data.players
                    })
            },
        },
        computed: {
            eastTeams () {
                return this.teams.filter(team => team.konferencja_oficjalnego_zespolu === 'East')
            },

            westTeams() {
                return this.teams.filter(team => team.konferencja_oficjalnego_zespolu === 'West')
            }
        },
    }
</script>

<style scoped>
.section-header {
    margin-top: 50px;
    margin-bottom: 50px;
}

.main-image {
    filter: grayscale(30%);
}

.main-image:hover {
    filter: grayscale(80%);
}
</style>
