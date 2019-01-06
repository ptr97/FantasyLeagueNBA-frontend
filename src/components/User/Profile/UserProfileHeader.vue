<template>
<div class="ui segment">
    <div class="ui grid container">
        <div class="four wide column">
            <img class="ui tiny avatar image" src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
        </div>
        <div class="bottom aligned twelve wide column">
            <div class="ui horizontal relaxed link list">
                <div class="item">
                    <div class="content">
                        <div class="header">First Name</div>
                        <strong>{{ this.user.imie_uzytkownika }}</strong>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="header">Last Name</div>
                        <strong>{{ this.user.nazwisko_uzytkownika }}</strong>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="header">e-mail</div>
                        <strong>{{ this.user.email_uzytkownika }}</strong>
                    </div>
                </div>
                <div class="item">
                </div>
            </div>
            <div class="ui right floated horizontal list" >
                <router-link to="/settings/profile" class="ui button primary">Edit profile</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'UserProfileHeader',
        props: {
            user: {
                type: Object,
                required: true
            }
        },
    }
</script>
