<template>
    <div class="ui feed">
        <FantasyTeamInline
            v-for="team in teams"
            :key="team.id_oficjalnego_zespolu"
            :team="team"
        />
    </div>
</template>

<script>
    import FantasyTeamInline from '@/components/FantasyTeam/FantasyTeamInline'

    export default {
        name: 'FantasyTeams',
        components: {
            FantasyTeamInline
        },
        props: {
            teams: {
                type: Array,
                required: true
            }
        }
    }
</script>