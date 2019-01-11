<template>
    <div class="event">
        <table class="ui blue padded selectable table">
            <tbody>
                <tr @click="showPlayerDetails">
                    <th>
                        <img class="ui mini circular image" :src="this.photo">
                    </th>
                    <th class="center aligned">
                        {{ this.fullName }}
                    </th>
                    <th class="right aligned">
                        <div class="ui orange circular label">{{ this.player.pozycja_zawodnika }}</div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'PlayerInline',
        props: {
            player: {
                type: Object,
                required: true
            },
        },
        // data() {
        //     return {
        //         photo: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.player.id_zawodnika}.png`
        //     }
        // },
        computed: {
            fullName() {
                return this.player.imie_zawodnika + ' ' + this.player.nazwisko_zawodnika
            },
            photo() {
                return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.player.id_zawodnika}.png`
            }
        },
        methods: {
            showPlayerDetails () {
                this.$router.push(`/players/${this.player.id_zawodnika}`)
            }
        }
    }
</script>