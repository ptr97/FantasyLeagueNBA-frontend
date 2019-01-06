import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings'
import UserDeleteAccount from '@/components/User/Settings/UserDeleteAccount'
import EditTeamInfo from '@/components/FantasyTeam/EditTeamInfo'
import EditFantasyTeam from '@/components/FantasyTeam/EditFantasyTeam'
import CreateFantasyTeam from '@/components/FantasyTeam/CreateFantasyTeam'
import SinglePlayer from '@/components/Player/SinglePlayer'
import SingleOfficialTeam from '@/components/OfficialTeam/SingleOfficialTeam'
import Home from '@/components/Home'
import UserProfile from '@/components/User/Profile/UserProfile'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/my-profile',
            name: 'MyProfile',
            component: UserProfile,
            props: true
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUpForm
        },
        {
            path: '/login',
            name: 'LogIn',
            component: LogInForm
        },
        {
            path: '/settings/profile',
            name: 'UserProfileSettings',
            component: UserProfileSettings
        },
        {
            path: '/settings/password',
            name: 'UserPasswordSettings',
            component: UserPasswordSettings
        },
        {
            path: '/settings/delete',
            name: 'UserDeleteAccount',
            component: UserDeleteAccount
        },
        {
            path: '/my-fantasy-team/edit/info',
            name: 'EditTeamInfo',
            component: EditTeamInfo
        },
        {
            path: '/my-fantasy-team/edit',
            name: 'EditFantasyTeam',
            component: EditFantasyTeam
        },
        {
            path: '/my-fantasy-team/create',
            name: 'CreateFantasyTeam',
            component: CreateFantasyTeam
        },
        {
            path: '/players/:id',
            name: 'SinglePlayer',
            component: SinglePlayer
        },
        {
            path: '/official-teams/:id',
            name: 'OfficialTeam',
            component: SingleOfficialTeam
        },
    ]
})
