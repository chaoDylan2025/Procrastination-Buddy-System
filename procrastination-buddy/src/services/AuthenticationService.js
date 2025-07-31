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
    sendPasswordResetEmail(email){
        return Api().post('PasswordReset', email)
    },
    changePassword(credentials){
        return Api().post('ChangePassword', credentials)
    },
    updateName(name){
        return Api().post('ChangeName', name)
    },
    changeEmail(email){
        return Api().post('ChangeEmail', email)
    },
    imagesAndLayOut () {
        return Api().get('MotivationalImages')
    },
    settingDefaultImages (images) {
        return Api().post('DefaultImages', images)
    },
    settingImagesAndImageLayout (images_and_layout){
        return Api().post('UpdateImagesAndLayout', images_and_layout)
    },
    restrictedWebsitesList(){
        return Api().get('RestrictedSitesList')
    },
    settingRestrictedWebsitesList(restricted_sites_list){
        return Api().post('UpdateRestrictedSitesList', restricted_sites_list)
    }
}