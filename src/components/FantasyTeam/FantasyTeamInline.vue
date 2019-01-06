<template>
    <div class="event">
        <table class="ui blue padded selectable table">
            <tbody>
                <tr>
                    <th>
                        <img class="ui mini rounded image" src="/static/nba-logo.png">
                    </th>
                    <th class="center aligned">
                        {{ this.team.nazwa_zespolu_uzytkownika }}
                    </th>
                    <th class="right aligned">
                        <div class="ui red circular label">{{ this.team.wynik_zespolu_uzytkownika }}</div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'FantasyTeamInline',
        props: {
            team: {
                type: Object,
                required: true
            },
        },
    }
</script>