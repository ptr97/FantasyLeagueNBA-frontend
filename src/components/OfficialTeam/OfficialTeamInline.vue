<template>
    <div class="event">
        <table class="ui blue padded selectable table">
            <tbody>
                <tr @click="showTeamDetails">
                    <th>
                        <img class="ui mini rounded image" src="/static/nba-logo.png">
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
        
        methods: {
            showTeamDetails () {
                this.$router.push(`/official-teams/${this.team.id_oficjalnego_zespolu}`)
            }
        }
    }
</script>