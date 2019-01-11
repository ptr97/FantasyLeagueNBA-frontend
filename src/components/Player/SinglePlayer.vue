<template>
<div>
    <div class="ui stackable column centered vertically padded grid container">
        <div class="fourteen wide column">
            <table class="ui orange table">
                <thead>
                    <tr>
                        <th class="left aligned">
                            <img class="ui small circular image" :src="this.photo">
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
                        <td>{{ this.stats.ppg }}</td>
                        <td>{{ this.stats.apg }}</td>
                        <td>{{ this.stats.rpg }}</td>
                        <td>{{ this.stats.spg }}</td>
                        <td>{{ this.stats.tpg }}</td>
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
    export default {
        name: 'SinglePlayer',
        data () {
            return {
                player: {},
                stats: {}
            }
        },
        created () {
            this.fetchPlayer()
            this.fetchStats()
        },
        methods: {
            fetchPlayer () {
                axios.get(`/players/${this.$route.params.id}`
                ).then(response => {
                    this.player = response.data.player
                })
            },
            fetchStats () {
                axios.get(`/players/${this.$route.params.id}/stats`
                ).then(response => {
                    this.stats = response.data.stats
                })
            },
            back () {
                this.$router.go(-1)
            }
        },
        computed: {
            fullName() {
                return this.player.imie_zawodnika + ' ' + this.player.nazwisko_zawodnika + ' #' + this.player.numer_koszulki
            },
            photo() {
                return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.player.id_zawodnika}.png`
            }
        },
    }
</script>
