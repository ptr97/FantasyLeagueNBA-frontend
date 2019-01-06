<template>
    <div class="event">
        <table class="ui blue padded selectable table">
            <tbody>
                <tr @click="showPlayerDetails">
                    <th>
                        <img class="ui mini circular image" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
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
        computed: {
            fullName() {
                return this.player.imie_zawodnika + ' ' + this.player.nazwisko_zawodnika
            },
        },
        methods: {
            showPlayerDetails () {
                this.$router.push(`/players/${this.player.id_zawodnika}`)
            }
        }
    }
</script>