<template>
<div class="ui stackable three column centered grid container">
    <div class="column">
        <h2 class="ui dividing header">Sign Up</h2>

        <Notification
            :message="notification.message"
            :type="notification.type"
            v-if="notification.message"
        />

        <form class="ui form" @submit.prevent="signup">

            <div class="field" :class="{ error: errors.has('email') }">
                <label>Email</label>
                <input type="email" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" v-model="email" v-validate="'required|email'" placeholder="Email">
                <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="field" :class="{ error: errors.has('password') }">
                <label>Password</label>
                <input type="password" name="password" :class="{'input': true, 'is-danger': errors.has('password') }" v-model="password" v-validate="'required'" placeholder="Password">
                <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
            </div>
            <div class="field" :class="{ error: errors.has('firstName') }">
                <label>First Name</label>
                <input type="text" name="firstName" v-model="firstName" v-validate="'required'" placeholder="First Name">
                <span v-show="errors.has('firstName')" class="is-danger">{{ errors.first('firstName') }}</span>
            </div>

            <div class="field" :class="{ error: errors.has('lastName') }">
                <label>Last Name</label>
                <input type="text" name="lastName" :class="{'input': true, 'is-danger': errors.has('lastName') }" v-model="lastName" v-validate="'required'" placeholder="Last Name">
                <span v-show="errors.has('lastName')" class="is-danger">{{ errors.first('lastName') }}</span>
            </div>

            <button class="fluid ui primary button" :disabled="!isFormValid">SIGN UP</button>

            <div class="ui hidden divider"></div>
        </form>

        <div class="ui divider"></div>

        <div class="ui column grid">
            <div class="center aligned column">
                <p>
                    Got an account? <router-link to="/login">Log In</router-link>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Notification from '@/components/Notification';

    export default {
        name: 'SignUpForm',
        components: {
            Notification,
        },
        data() {
            return {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                notification: {
                    message: '',
                    type: '',
                },
            };
        },
        computed: {
            isFormValid() {
                return Object.keys(this.fields).every(key => this.fields[key].valid)
            },
        },
        beforeRouteEnter(to, from, next) {
            const token = localStorage.getItem('token')

            return token ? next('/') : next()
        },
        methods: {
            signup() {
                axios
                    .post('/users', {
                        email: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                    })
                    .then(response => {
                        // save token in localstorage
                        localStorage.setItem('token', response.data.token)

                        // redirect to user home
                        this.$router.push('/my-profile')
                    })
                    .catch(error => {
                        // display error notification
                        this.notification = Object.assign({}, this.notification, {
                            message: error.response.data.message,
                            type: error.response.data.status,
                        });
                    });
            },
        },
    }
</script>
