<template>
<div class="ui stackable grid container">
    <div class="fourteen wide column">
        <div class="ui segment">
            <h2 class="ui dividing header">Edit team info</h2>

            <Notification
                :message="notification.message"
                :type="notification.type"
                v-if="notification.message"
            />

            <form class="ui form" @submit.prevent="updateTeamInfo">
                <div class="field" :class="{ error: errors.has('teamName') }">
                    <label>Team Name</label>
                    <input type="text" name="teamName" v-model="teamName" v-validate="'required'">
                    <span v-show="errors.has('teamName')" class="is-danger">{{ errors.first('teamName') }}</span>
                </div>

                <button class="ui button primary">Update</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
    name: 'EditTeamInfo',
    components: {
        Notification,
    },
    data () {
        return {
            teamName: '',
            notification: {
                message: '',
                type: ''
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        const token = localStorage.getItem('token')

        return token ? next() : next('/login')
    },
    created () {
        this.fetchTeamInfo()
    },
    methods: {
        fetchTeamInfo () {
            const token = localStorage.getItem('token')

            axios
                .get('/fantasy-teams/my-team', {
                    headers: {
                        'x-access-token': `${token}`
                    }
                })
                .then(response => {
                    this.teamName = response.data.teamInfo.nazwa_zespolu_uzytkownika
                })
        },
        updateTeamInfo () {
            const token = localStorage.getItem('token')

            axios
                .put(
                    '/fantasy-teams/my-team/info',
                    {
                        newName: this.teamName,
                    },
                    {
                        headers: {
                            'x-access-token': `${token}`
                        }
                    }
                )
                .then(response => {
                    this.notification = Object.assign({}, this.notification, {
                        message: response.data.message,
                        type: 'success'
                    })
                })
        }
    }
}
</script>
