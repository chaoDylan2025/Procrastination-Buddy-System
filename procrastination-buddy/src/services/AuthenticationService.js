import Api from './Api'

export default {
    createUser (credentials) {
        return Api().post('SignUp', credentials)
    },
    
    loginUser (credentials){
        return Api().post('login', credentials)
    },

    getDefaultImages () {
        return Api().get('GetDefaultImages')
    },

    getAllImages () {
        return Api().get('GetAllImages')
    },

    downloadImages (image) {
        return Api().post('DownloadImages', image)
    },

    userIsLoggedIn () {
        return Api().get('LoggedIn')
    },

    logoutUser () {
        return Api().post('logout')
    }
}