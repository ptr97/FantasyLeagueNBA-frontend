<template>
    <div class="ui feed">
        <table class="ui red selectable padded table">
            <thead>
                <tr @click="sort($event)">
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Position</td>
                    <td>Salary</td>
                    <td class="sortable">PPG</td>
                    <td class="sortable">APG</td>
                    <td class="sortable">RPG</td>
                    <td class="sortable">SPG</td>
                    <td class="sortable">TPG</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in players" :key="player.id_zawodnika" :player="player" :class="{'active': (player.id_zawodnika == checkedId)}" @click="playerChecked(player.id_zawodnika)" >
                    <td>{{ player.imie_zawodnika }}</td>
                    <td>{{ player.nazwisko_zawodnika }}</td>
                    <td>{{ player.pozycja_zawodnika }}</td>
                    <td>{{ player.zarobki_zawodnika }}</td>
                    <td>{{ player.ppg }}</td>
                    <td>{{ player.apg }}</td>
                    <td>{{ player.rpg }}</td>
                    <td>{{ player.spg }}</td>
                    <td>{{ player.tpg }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
        name: 'PlayersDetailsOffline',
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
                desc: false,
            }
        },
        computed: {

        },
        methods: {
            playerChecked (id) {
                this.checkedId = id
                this.$router.push(`/players/${id}`)
            },

            sort(event) {
                this.desc = !this.desc
                const by = event.target.innerText.toLowerCase()
                console.log(event.target.id)
                this.$emit('sort', by, this.desc)
            },
        },
    }
</script>

<style scoped>
.sortable:hover {
    color: blue;
    cursor: pointer;
}
</style>
