<template>
<div class="ui massive blue inverted fixed menu container">
    <div class="ui container">
        <router-link class="header item" to="/">NBA Fantasy League</router-link>
        <div class="right menu" v-if="ifLogged">
            <router-link class="item" to="/"><i class="home icon"></i></router-link>
            <router-link class="item" to="/my-profile">Profile</router-link>
            <router-link class="item" to="/settings/profile">Settings</router-link>
            <a class="item" @click="logout"><i class="sign out icon"></i></a>
        </div>
        <div class="right menu" v-if="!ifLogged">
            <router-link class="item" to="/"><i class="home icon"></i></router-link>
            <router-link class="item" to="/login">LogIn</router-link>
            <router-link class="item" to="/signup">SignUp</router-link>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'MyHeader',
        props: {
            ifLogged: {
                type: Boolean,
                required: true
            },
            user: {
                type: Object,
                required: false
            },
        },
        methods: {
            logout () {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        },
    }
</script>
