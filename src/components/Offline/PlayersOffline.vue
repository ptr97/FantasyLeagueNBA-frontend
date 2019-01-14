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
            <Notification
            :message="notification.message"
            :type="notification.type"
            v-if="notification.message"
        />
        <div class="ui segment">
            <div class="ui fluid icon input">
                <input type="text" v-model="queryText" placeholder="Search player...">
                <i class="search icon"></i>
            </div>
        </div>
        <div class="ui segment">
            <h2 class="ui medium dividing header">All Players</h2>
            
            <PlayersDetailsOffline 
            :players.sync="filteredList"
            @sort="sortPlayers"
            />


            <div class="column">
                <div class="ui three column padded grid">
                    <div class="column">
                        <button @click="previousPage" class="ui small orange button"><i class="arrow left icon"></i></button>
                    </div>
                    <div class="center aligned flex column">
                        <p class="ui orange circular label">{{this.pageNumber}}</p>
                    </div>
                    <div class="column">
                        <button @click="nextPage" class="ui button orange right floated"><i class="arrow right icon"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import offline from 'v-offline'
import Notification from '@/components/Notification'
import PlayersDetailsOffline from '@/components/Offline/PlayersDetailsOffline'
import { openDb, deleteDb } from 'idb'

const dbPromise = openDb('players-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('players')
})

const idbPlayers = {
    async getAllPlayers() {
        const db = await dbPromise
        return db.transaction('players').objectStore('players').getAll()
    },
    async getPlayer(id) {
        const db = await dbPromise
        return db.transaction('players').objectStore('players').get(id)
    },
    async setPlayer(key, val) {
        const db = await dbPromise
        const tx = db.transaction('players', 'readwrite')
        tx.objectStore('players').put(val, key)
        return tx.complete
    },
    async keys() {
        const db = await dbPromise
        return db.transaction('players').objectStore('players').getAllKeys(key)
    },
}

export default {
    name: 'PlayersOffline',
    components: {
        offline, 
        Notification,
        PlayersDetailsOffline,
    },

    data() {
        return {
            queryText: '',
            pageNumber: 1,
            players: [],
            playerCount: '',
            webStatus: false,
            notification: {
                message: '',
                type: ''
            },
        }
    },

    created() {
        this.fetchPlayers()
    },

    computed: {
        filteredList() {
            return this.players.filter(player => {
                return player.nazwisko_zawodnika.toLowerCase().includes(this.queryText.toLowerCase())
            }).slice(((this.pageNumber - 1) * 20), (this.pageNumber * 20))
        }
    },

    methods: {
        sortPlayers(by, desc) {
            if(desc) {
                this.players.sort((p1, p2) => {
                    return p2[by] - p1[by]
                })
            } else {
                this.players.sort((p1, p2) => {
                    return p1[by] - p2[by]
                })
            }
        },

        async fetchPlayers () {
            if(this.webStatus) {
                axios
                .get(`/players`)
                .then(async response => {
                    this.notification = Object.assign({}, this.notification, {
                        message: 'IndexedDB została zaktualizowana. Zawodnicy zostali pobrani z bazy danych...',
                        type: 'info'
                    })
                    response.data.allPlayers.map(async player => {
                        await idbPlayers.setPlayer(player.id_zawodnika, player)
                    })

                    this.players = await idbPlayers.getAllPlayers()
                })
                .catch(async error => {
                    this.notification = Object.assign({}, this.notification, {
                        message: 'API nie odpowiada... Zawodnicy zostaną pobrani z IndexedDB.',
                        type: 'info'
                    })
                    // Odczytac z IndexedDB
                    this.players = await idbPlayers.getAllPlayers()
                })
            } else {
                this.notification = Object.assign({}, this.notification, {
                    message: 'Brak dostępu do internetu... Zawodnicy zostaną pobrani z IndexedDB.',
                    type: 'info'
                })
                // Odczytac z IndexedDB
                this.players = await idbPlayers.getAllPlayers()
            }
        },

        handleConnectivityChange(status) {
            this.webStatus = status
            this.fetchPlayers()
        },

        nextPage () {
            this.pageNumber += 1
        },

        previousPage () {
            if(this.pageNumber > 1) {
                this.pageNumber -= 1
            }
        },
    },
}
</script>
