<template>
    <div class="ui feed">
        <div class="event">
            <table class="ui orange table">
                <thead>
                    <tr>
                        <th>Team name</th>
                        <th>Team score</th>
                        <th>Players salary</th>
                        <th>Team budget</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ this.fantasyTeam.nazwa_zespolu_uzytkownika }}</td>
                        <td>{{ this.fantasyTeam.wynik_zespolu_uzytkownika }} PTS</td>
                        <td>{{ this.fantasyTeam.suma_wynagrodzen_zawodnikow }} $</td>
                        <td>{{ this.fantasyTeam.budzet_zespolu_uzytkownika }} $</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FantasyTeamInfo',
        props: {
            fantasyTeam: {
                type: Object,
                required: true
            }
        },
}
</script>
