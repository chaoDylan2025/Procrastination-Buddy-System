import Api from './Api'

export default {
    createUser (credentials) {
        return Api().post('SignUp', credentials)
    },
    
    loginUser (credentials){
        return Api().post('login', credentials)
    },

    userIsLoggedIn () {
        return Api().get('LoggedIn')
    },

    logoutUser () {
        return Api().post('logout')
    },
    imagesAndLayOut () {
        return Api().get('MotivationalImages')
    },
    settingDefaultImages (images) {
        return Api().post('DefaultImages', images)
    }
}