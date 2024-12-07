import Api from './Api'

export default {
    createUser (credentials) {
        return Api().post('SignUp', credentials)
    },
    
    loginUser (credentials){
        return Api().post('login', credentials)
    },

    getCurrentUserImages (email) {
        return Api().post('PersonalPage', email)
    }
}