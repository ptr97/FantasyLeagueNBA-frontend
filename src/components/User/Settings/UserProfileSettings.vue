<template>
<div class="ui stackable grid container">
    <UserSettingsMenu/>

    <div class="eight wide column">
        <div class="ui segment">
            <h2 class="ui dividing header">Edit Profile</h2>

            <Notification
                :message="notification.message"
                :type="notification.type"
                v-if="notification.message"
            />

            <form class="ui form" @submit.prevent="updateProfile">
                <div class="field" :class="{ error: errors.has('name') }">
                    <label>First Name</label>
                    <input type="text" name="firstName" v-model="firstName" v-validate="'required'">
                    <span v-show="errors.has('firstName')" class="is-danger">{{ errors.first('firstName') }}</span>
                </div>

                <div class="field" :class="{ error: errors.has('lastName') }">
                    <label>Last Name</label>
                    <input type="text" name="lastName" v-model="lastName" v-validate="'required'">
                    <span v-show="errors.has('lastName')" class="is-danger">{{ errors.first('lastName') }}</span>
                </div>

                <div class="field" :class="{ error: errors.has('email') }">
                    <label>Email</label>
                    <input type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Email">
                    <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
                </div>

                <button class="ui button primary">Update profile</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Notification from '@/components/Notification'
import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'

export default {
    name: 'UserProfileSettings',
    components: {
        Notification,
        UserSettingsMenu
    },
    data () {
        return {
            firstName: '',
            lastName: '',
            email: '',
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
        this.fetchAuthenticatedUser()
    },
    methods: {
        fetchAuthenticatedUser () {
            const token = localStorage.getItem('token')

            axios
                .get('users/me', {
                    headers: {
                        'x-access-token': `${token}`
                    }
                })
                .then(response => {
                    this.firstName = response.data.data.imie_uzytkownika
                    this.lastName = response.data.data.nazwisko_uzytkownika
                    this.email = response.data.data.email_uzytkownika
                })
        },
        updateProfile () {
            const token = localStorage.getItem('token')

            axios
                .put(
                    '/users/me',
                    {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                    },
                    {
                        headers: {
                            'x-access-token': `${token}`
                        }
                    }
                )
                .then(response => {
                    // display success notification
                    this.notification = Object.assign({}, this.notification, {
                        message: response.data.message,
                        type: 'success'
                    })
                })
        }
    }
}
</script>
