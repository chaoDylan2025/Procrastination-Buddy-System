import Api from './Api'

export default {
    createUser (credentials) {
        return Api().post('SignUp', credentials)
    },
    
    loginUser (credentials){
        return Api().post('login', credentials)
    },

    getImages () {
        return Api().get('PersonalPage')
    },
}