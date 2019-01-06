<template>
    <div class="four wide column">
        <router-link class="ui button mini primary" to="/my-profile">Back Home</router-link>
        <div class="ui fluid vertical pointing menu">
            <div class="item">
                <router-link to="/settings/profile">Profile</router-link>
            </div>
            <div class="item">
                <router-link to="/settings/password">Password</router-link>
            </div>
            <div class="item">
                <router-link to="/settings/delete">Delete account</router-link>
            </div>
        </div>
    </div>
</template>