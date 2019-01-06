<template>
    <div>
        <MyHeader :user="user" :ifLogged="true" />
        
        <UserProfileHeader :user="user" />

        <div class="ui stackable grid container">
            <div class="eight wide column">
                <div v-if="this.players.length !== 0" class="ui segment">
                    <h2 class="ui medium dividing header">My Fantasy Team Info</h2>

                    <FantasyTeamInfo
                        :fantasyTeam.sync="teamInfo"
                    />
                    <div class="ui right floated horizontal list" >
                        <router-link to="/my-fantasy-team/edit/info" class="ui button primary">Edit team info</router-link>
                    </div>
                </div>
            </div>
            <div v-if="this.players.length !== 0" class="eight wide column">
                <div class="ui segment">
                    <h2 class="ui medium dividing header">Lineup</h2>

                    <Players
                        :players.sync="players"
                    />
                    <div class="ui right floated horizontal list" >
                        <router-link to="/my-fantasy-team/edit" class="ui button primary">Edit lineup</router-link>
                    </div>
                </div>
            </div>

            <div v-if="this.players.length === 0" class="sixteen wide column center aligned ">
                    <router-link to="/my-fantasy-team/create" class="ui button big primary">Create Fantasy Team</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from '@/components/MyHeader'
    import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
    import Players from '@/components/Player/Players'
    import FantasyTeamInfo from '@/components/FantasyTeam/FantasyTeamInfo'

    export default {
        name: 'UserProfile',
        components: {
            MyHeader,
            UserProfileHeader,
            Players,
            FantasyTeamInfo
        },
        data () {
            return {
                user: {},
                players: [],
                teamInfo: {}
            }
        },
        beforeRouteEnter (to, from, next) {
            const token = localStorage.getItem('token')

            return token ? next() : next('/login')
        },
        created () {
            this.fetchAuthenticatedUser()
            this.fetchUserFantasyTeam()
        },
        methods: {
            fetchAuthenticatedUser () {
                const token = localStorage.getItem('token')

                axios
                    .get('/users/me', {
                        headers: {
                            'x-access-token': `${token}`
                        }
                    })
                    .then(response => {
                        this.user = response.data.data
                    })
            },
            fetchUserFantasyTeam () {
                const token = localStorage.getItem('token')

                axios
                    .get('/fantasy-teams/my-team', {
                        headers: {
                            'x-access-token': `${token}`
                        }
                    })
                    .then(response => {
                        this.players = response.data.players
                        this.teamInfo = response.data.teamInfo
                    })
            }
        }
    }
</script>
