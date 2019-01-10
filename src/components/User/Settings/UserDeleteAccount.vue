<template>
<div class="ui stackable grid container">
    <UserSettingsMenu/>

    <div class="eight wide column">
        <div class="ui segment">
            <h2 class="ui dividing header">Delete account</h2>

            <Notification
                :message="notification.message"
                :type="notification.type"
                v-if="notification.message"
            />
            <button class="ui button primary" @click.prevent="deleteAccount"><i class="trash icon"></i>Delete account</button>
        </div>
    </div>
</div>
</template>

<script>
    import Notification from '@/components/Notification'
    import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'

    export default {
        name: 'UserDeleteAccount',
        components: {
            Notification,
            UserSettingsMenu
        },
        data () {
            return {
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
        methods: {
            deleteAccount () {
                const token = localStorage.getItem('token')

                axios
                    .delete(
                        '/users/me',
                        {
                            headers: {
                                'x-access-token': `${token}`
                            },
                        }
                    )
                    .then(response => {
                        console.log(response.body)
                        this.notification = Object.assign({}, this.notification, {
                            message: response.data.message,
                            type: 'success'
                        })
                        this.$router.push('/')
                    })
                    .catch(error => {
                        this.notification = Object.assign({}, this.notification, {
                            message: error.response.data.message,
                            type: 'error'
                        })
                    })
            }
        }
    }
</script>
