<template>
    <div class="ui feed">
        <PlayerInline
            v-for="player in players"
            :key="player.id_zawodnika"
            :player="player"
        />
    </div>
</template>

<script>
    import PlayerInline from '@/components/Player/PlayerInline'

    export default {
        name: 'Players',
        components: {
            PlayerInline
        },
        props: {
            players: {
                type: Array,
                required: true
            }
        }
    }
</script>