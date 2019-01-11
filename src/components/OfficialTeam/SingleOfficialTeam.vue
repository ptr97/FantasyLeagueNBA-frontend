<template>
<div>
    <div class="ui stackable column centered vertically padded grid container">
        <div class="fourteen wide column">
            <table class="ui orange table">
                <thead>
                    <tr>
                        <th class="left aligned">
                            <img class="ui small rounded image" :src="this.logo">
                        </th>
                        <th class="left aligned">
                            <h1>{{ this.team.nazwa_oficjalnego_zespolu }}</h1>
                        </th> 
                    </tr>
                </thead>
            </table>
            <table class="ui red padded table">
                <thead>
                    <tr>
                        <th>Tri-code</th>
                        <th>Division</th>
                        <th>Conference</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ this.team.kod_oficjalnego_zespolu }}</td>
                        <td>{{ this.team.dywizja_oficjalnego_zespolu }}</td>
                        <td>{{ this.team.konferencja_oficjalnego_zespolu }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="ui divider"></div>            
            <h2>Stats</h2>
            <table class="ui violet padded table">
                <thead>
                    <tr>
                        <th>Wins</th>
                        <th>Loses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ this.team.zwyciestwa }}</td>
                        <td>{{ this.team.porazki }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="ui divider"></div>
            <div class="ui segment">
                <h2 class="ui medium dividing header">Lineup</h2>
                <Players :players="this.players"/>
            </div>
        </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui stackable column centered vertically padded grid container">
        <a class="ui button mini primary" @click="back">Back</a>
    </div>
    <div class="ui divider"></div>    
</div>
</template>

<script>
    import Players from '@/components/Player/Players'

    export default {
        name: 'SingleTeam',
        components: {
            Players
        },
        data () {
            return {
                team: {},
                players: [],
            }
        },
        created () {
            this.fetchTeam()
            this.fetchPlayers()
        },
        computed: {
            logo() {
                return `https://www.nba.com/assets/logos/teams/primary/web/${this.team.kod_oficjalnego_zespolu}.svg`
            }
        },
        methods: {
            fetchTeam () {
                axios.get(`/official-teams/${this.$route.params.id}`
                ).then(response => {
                    this.team = response.data.team
                })
            },
            fetchPlayers () {
                axios.get(`/official-teams/${this.$route.params.id}/players`
                ).then(response => {
                    this.players = response.data.players
                })
            },
            back () {
                this.$router.go(-1)
            }
        },
    }
</script>
