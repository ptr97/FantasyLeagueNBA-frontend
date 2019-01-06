<template>
<div class="ui stackable grid container">
    <div class="ten wide column">
        <div class="ui segment">
            <Notification
                :message="notification.message"
                :type="notification.type"
                v-if="notification.message"
            />
            <button @click="saveTeam" class="ui button primary">Save Team</button>
        </div>
        <div class="ui segment">
            <h2 class="ui dividing header">Team info</h2>

            <form class="ui form" @submit.prevent="updateTeamInfo">
                <div class="field" :class="{ error: errors.has('teamName') }">
                    <label>Team Name</label>
                    <input type="text" name="teamName" v-model="teamName" v-validate="'required'">
                    <span v-show="errors.has('teamName')" class="is-danger">{{ errors.first('teamName') }}</span>
                </div>
            </form>
        </div>
    </div>
    <div class="fourteen wide column">
        <div class="ui segment">
            <h2 class="ui medium dividing header">Lineup</h2>

            <PlayersDetails
                :players.sync="myPlayers"
                @playerChecked="oldPlayerChecked"
            />
            
            <button @click="deletePlayers" class="ui button primary">Delete</button>
            <button @click="addPlayers" class="ui button primary">Add</button>
        </div>
        <div class="ui divider"></div>
        <div class="ui segment">
            <h2 class="ui medium dividing header">Players to choose</h2>

            <PlayersDetails
                :players.sync="allPlayers"
                @playerChecked="newPlayerChecked"
            />
            <div>
                <button @click="nextPage" class="ui button primary right floated">Next page</button>
                <button @click="previousPage" class="ui button primary">Previous Page</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PlayersDetails from '@/components/Player/PlayersDetails'
import Notification from '@/components/Notification'

export default {
    name: 'CreateFantasyTeam',
    components: {
        PlayersDetails,
        Notification,
    },
    data () {
        return {
            teamName: '',
            myPlayers: [],
            allPlayers: [],
            allPlayersPage: 1,
            oldPlayerId: '',
            newPlayerId: '',
            notification: {
                message: '',
                type: ''
            },
        }
    },
    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('token')

        return token ? next() : next('/login')
    },
    created () {
        this.fetchMyPlayers()
        this.fetchPlayers(1)
    },
    methods: {
        oldPlayerChecked (id) {
            this.oldPlayerId = id
        },
        newPlayerChecked (id) {
            this.newPlayerId = id
        },
        deletePlayers () {
            const playerToDelete = this.myPlayers.map(pl => pl.id_zawodnika).indexOf(this.oldPlayerId)
            console.log(playerToDelete)
            this.$delete(this.myPlayers, playerToDelete)
        },
        addPlayers () {
            const playerToAdd = this.allPlayers.filter(pl => pl.id_zawodnika === this.newPlayerId)[0]
            console.log(playerToAdd)
            this.myPlayers.push(playerToAdd)
        },
        fetchMyPlayers () {
            const token = localStorage.getItem('token')

            axios
                .get('/fantasy-teams/my-team', {
                    headers: {
                        'x-access-token': `${token}`
                    }
                })
                .then(response => {
                    this.myPlayers = response.data.players
                })
        },

        nextPage () {
            this.allPlayersPage += 1
            this.fetchPlayers()
        },

        previousPage () {
            if(this.allPlayersPage > 1) {
                this.allPlayersPage -= 1
                this.fetchPlayers()
            }
        },

        fetchPlayers () {
            axios
                .get(`/players/page/${this.allPlayersPage}`)
                .then(response => {
                    this.allPlayers = response.data.players
                })
        },

        saveTeam () {
            const token = localStorage.getItem('token')
            console.log(this.myPlayers)

            axios
                .post(
                    '/fantasy-teams',
                    {
                        teamName: this.teamName,
                        players: this.myPlayers,
                    },
                    {
                        headers: {
                            'x-access-token': `${token}`
                        }
                    }
                )
                .then(response => {
                    this.notification = Object.assign({}, this.notification, {
                        message: response.data.message,
                        type: 'success'
                    })
                })
                .catch(error => {
                    this.notification = Object.assign({}, this.notification, {
                        message: error.response.data.message,
                        type: 'error'
                    })
                })
        }
    }
}
</script>
