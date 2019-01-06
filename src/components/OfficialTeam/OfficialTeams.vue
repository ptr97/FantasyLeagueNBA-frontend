<template>
    <div class="ui feed">
        <OfficialTeamInline
            v-for="team in teams"
            :key="team.id_oficjalnego_zespolu"
            :team="team"
        />
    </div>
</template>

<script>
    import OfficialTeamInline from '@/components/OfficialTeam/OfficialTeamInline'

    export default {
        name: 'OfficialTeams',
        components: {
            OfficialTeamInline
        },
        props: {
            teams: {
                type: Array,
                required: true
            }
        }
    }
</script>