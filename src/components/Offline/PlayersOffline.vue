<template>
<div class="ui stackable grid container">
    <div class="sixteen wide column">
        <offline @detected-condition="handleConnectivityChange">
        <div slot="offline" class="ui violet message">
            Offline
        </div>
        <div slot="online" class="ui green message">
            Online
        </div>
        </offline>
        <div :v-if="this.notification.message != ''" class="ui segment">
            <Notification
            :message="notification.message"
            :type="notification.type"
            v-if="notification.message"
        />
        </div>
        <div class="ui segment">
            <h2 class="ui medium dividing header">Players [Offline]</h2>
            <PlayersDetailsOffline :players.sync="players"/>
        </div>
    </div>
</div>
</template>

<script>
import offline from 'v-offline'
import Notification from '@/components/Notification'
import PlayersDetailsOffline from '@/components/Offline/PlayersDetailsOffline'

export default {
    name: 'PlayersOffline',
    components: {
        offline, 
        Notification,
        PlayersDetailsOffline,
    },
    data() {
        return {
            players: [],
            playerCount: '',
            notification: {
                message: '',
                type: ''
            },
        }
    },
    created() {
        this.fetchPlayers()
    },
    methods: {
        fetchPlayers () {
            axios
                .get(`/players`)
                .then(response => {
                    this.players = response.data.allPlayers
                    this.playerCount = response.data.playerCount
                })
                .catch(error => {
                    this.notification = Object.assign({}, this.notification, {
                        message: 'Brak dostępu do internetu... Zawodnicy zostaną pobrani z IndexedDB.',
                        type: 'info'
                    })
                    this.players = []
                    this.playerCount = 0
                })
        },
        handleConnectivityChange(status) {
            console.log(status);
        }
    },

}
</script>
