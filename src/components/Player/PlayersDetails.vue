<template>
    <div class="ui feed">
        <table class="ui red selectable padded table">
            <thead>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Position</td>
                    <td>Salary</td>
                    <td>PPG</td>
                    <td>APG</td>
                    <td>RPG</td>
                    <td>SPG</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in players" :key="player.id_zawodnika" :player="player" :class="{'active': (player.id_zawodnika == checkedId)}" @click="playerChecked(player.id_zawodnika)" >
                    <td>{{ player.imie_zawodnika }}</td>
                    <td>{{ player.nazwisko_zawodnika }}</td>
                    <td>{{ player.pozycja_zawodnika }}</td>
                    <td>{{ player.wartosc_kontraktu || player.zarobki_zawodnika }}</td>
                    <td>{{ player.ppg }}</td>
                    <td>{{ player.apg }}</td>
                    <td>{{ player.rpg }}</td>
                    <td>{{ player.spg }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'PlayersDetails',
        components: {
        },
        props: {
            players: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                checkedId: '',
            }
        },
        computed: {

        },
        methods: {
            playerChecked (id) {
                this.checkedId = id
                this.$emit('playerChecked', id)
            },
        },
    }
</script>