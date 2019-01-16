<template>
<div>
    <div class="ui stackable column centered vertically padded grid container">
        <div class="fourteen wide column">
            <offline>
        <div slot="offline" class="ui violet message">
            Offline
        </div>
        <div slot="online" class="ui green message">
            Online
        </div>
        </offline>
            <table class="ui orange table">
                <thead>
                    <tr>
                        <th class="left aligned">
                            <img class="ui small circular image" :src="'data:image/jpeg;base64,' + this.photo">
                        </th>
                        <th class="left aligned">
                            <h1>{{ this.fullName }}</h1>
                        </th> 
                    </tr>
                </thead>
            </table>
            <table class="ui red padded table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ this.player.pozycja_zawodnika }}</td>
                        <td>{{ this.player.wzrost_zawodnika }} m</td>
                        <td>{{ this.player.waga_zawodnika }} kg</td>
                        <td>{{ this.player.zarobki_zawodnika }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="ui divider"></div>            
            <h2>Stats</h2>
            <table class="ui violet padded table">
                <thead>
                    <tr>
                        <th>PPG</th>
                        <th>APG</th>
                        <th>RPG</th>
                        <th>SPG</th>
                        <th>TPG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ this.player.ppg }}</td>
                        <td>{{ this.player.apg }}</td>
                        <td>{{ this.player.rpg }}</td>
                        <td>{{ this.player.spg }}</td>
                        <td>{{ this.player.tpg }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="ui divider"></div>
        </div>
    </div>
    <div class="ui stackable column centered vertically padded grid container">
        <a class="ui button mini primary" @click="back">Back</a>
    </div>
    
</div>
</template>

<script>
import offline from 'v-offline'
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

const dbPromisePhotos = openDb('photos-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('photos')
})

const idbPhotos = {
    async getPhoto(player_id) {
        const db = await dbPromisePhotos
        return db.transaction('photos').objectStore('photos').get(player_id)
    },
    async setPhoto(key, val) {
        const db = await dbPromisePhotos
        const tx = db.transaction('photos', 'readwrite')
        tx.objectStore('photos').put(val, key)
        return tx.complete
    },
}


    export default {
        name: 'SinglePlayerOffline',
        
        components: {
            offline,
        },

        data () {
            return {
                player: {},
                photo: '',
                webStatus: false,
            }
        },

        mounted () {
            this.fetchPlayerWithStats()
        },

        methods: {
            async fetchPlayerWithStats() {
                this.player = await idbPlayers.getPlayer(this.$route.params.id)
                this.photo = await idbPhotos.getPhoto(this.player.id_zawodnika)
            },
            
            back() {
                this.$router.go(-1)
            },
        },
        computed: {
            fullName() {
                return this.player.imie_zawodnika + ' ' + this.player.nazwisko_zawodnika + ' #' + this.player.numer_koszulki
            },

            // photo() {
            //     return 'data:image/jpeg;base64,' + this.photo
            // }
        },
    }
</script>
