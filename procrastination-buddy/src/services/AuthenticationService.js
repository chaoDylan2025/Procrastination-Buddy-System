import Api from './Api'

export default {
    createUser (credentials) {
        return Api().post('signup', credentials)
    },
    loginUser (credentials){
        return Api().post('login', credentials)
    },
    userIsLoggedIn () {
        return Api().get('logged-in')
    },
    logoutUser () {
        return Api().post('logout')
    },
    deleteAccount (credentials) {
        return Api().post('delete-account', credentials)
    },
    updateName(name){
        return Api().post('change-name', name)
    },
    changePassword(credentials){
        return Api().post('change-password', credentials)
    },
    sendPasswordResetEmail(email){
        return Api().post('password-reset', email)
    },
    updateImagesAndLayout () {
        return Api().get('motivational-images')
    },
    settingDefaultImages (email_and_images) {
        return Api().post('default-images', email_and_images)
    },
    settingImagesAndImageLayout (images_and_layout){
        return Api().post('update-images-and-layout', images_and_layout)
    },
    restrictedWebsitesList(){
        return Api().get('restricted-sites-list')
    },
    settingRestrictedWebsitesList(restricted_sites_list){
        return Api().post('update-restricted-sites-list', restricted_sites_list)
    }
}