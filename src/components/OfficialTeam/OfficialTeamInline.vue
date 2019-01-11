<template>
    <div class="event">
        <table class="ui blue padded selectable table">
            <tbody>
                <tr @click="showTeamDetails">
                    <th>
                        <img class="ui mini rounded image" :src="this.logo">
                    </th>
                    <th class="center aligned">
                        {{ this.team.nazwa_oficjalnego_zespolu }}
                    </th>
                    <th class="right aligned">
                        <div class="ui red circular label">{{ this.team.konferencja_oficjalnego_zespolu }}</div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'OfficialTeamInline',
        props: {
            team: {
                type: Object,
                required: true
            },
        },
        // data() {
        //     return {
        //         logo: `https://www.nba.com/assets/logos/teams/primary/web/${this.team.kod_oficjalnego_zespolu}.svg`
        //     }
        // },
        computed: {
            logo() {
                return `https://www.nba.com/assets/logos/teams/primary/web/${this.team.kod_oficjalnego_zespolu}.svg`
            }
        },
        methods: {
            showTeamDetails () {
                this.$router.push(`/official-teams/${this.team.id_oficjalnego_zespolu}`)
            }
        }
    }
</script>