import express from 'express'
import cors from 'cors'
import { createUser, login, getUser, logout, sendPasswordResetEmail, updateDisplayedName, changePassword, changeEmail, deleteUserAccount } from './code/user.js'
import { getImagesAndLayout, setDefaultImages, updateImagesAndLayout } from './code/motivational_page.js'
import { getRestrictedSitesList, setRestrictedSiteList } from './code/focus_list_page.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Make public folder images static
//app.use(express.static("public"))

/**
 * Post request for creating a new account
 */
app.post('/signup', async (req, res) => {
    // Sets values for email, password, and password to confirm
    const { email, password, confirm_password } = req.body

    const result = await createUser(email, password, confirm_password)    
    
    res.send({
        status: result,
        email: email
    })
})

/**
 * Post request for logging in
 */
app.post('/login', async (req, res) => {
    // Sets values for email and password
    const { email, password } = req.body
    const result = await login(email, password)

    res.send({
        status: result.loggedIn,
        email: result.email,
        name: result.name
    })
})

/**
 * Get request for checking if user is currently signed in
 */
app.get('/logged-in', (req, res) => {
    const result = getUser()

    res.send({
        email: result
    })
})

/**
 * Post request for sending password reset email to the user
 */
app.post('/password-reset', (req, res) => {
    const { email } = req.body

    sendPasswordResetEmail(email)

    res.send({
        status: true
    })
})

/**
 * Post request for changing password
 */
app.post('/change-password', (req, res) => {
    const { email, current_password, new_password } = req.body

    changePassword(email, current_password, new_password)

    res.send({
        status: true
    })
})

/**
 * Post request for changing email
 */
app.post('/change-email', (req, res) => {
    const { email } = req.body

    changeEmail(email)

    res.send({
        status: true
    })
})

/**
 * Post request for changing name of user's profile
 */
app.post('/change-name', (req, res) => {
    const { name } = req.body

    updateDisplayedName(name)

    res.send({
        status: true
    })
})


/**
 * Post request for logging user out
 */
app.post('/logout', async (req, res) => {
    const result = await logout()

    if(result === true){
        console.log("User has been logged out...")
        res.send({
            status: result
        })  
    }
})

/**
 * Post request for deleting user account
 */
app.post('/delete-account', async (req, res) => {
    const {email, password} = req.body
    const result = await deleteUserAccount(email, password)

    if(result === true){
        res.send(true)
    }  
})

/**
 * Get request for getting current motivational images of user
 */
app.get('/motivational-images', async (req, res) => {
    const result = await getImagesAndLayout()

    res.send(result)
})

/**
 * Post request for setting default images for user with no images
 */
app.post('/default-images', async (req, res) => {
    const { email, default_imgs } = req.body

    console.log("Email received: ", email)
    console.log("Images received: ", default_imgs)

    const result = await setDefaultImages(email, default_imgs)

    res.send({
        status: result
    })
})

/**
 * Post request for setting updated images and image layout for current user
 */
app.post('/update-images-and-layout', async (req, res) => {
    const { image_layout, images } = req.body
    const result = await updateImagesAndLayout(image_layout, images)

    res.send({
        status: result
    })
})

/**
 * Get request for getting the user's current restricted websites list
 */
app.get('/restricted-sites-list', async (req, res) => {
    const result = await getRestrictedSitesList()
    res.send(result)
})

/**
 * Post request for updating user's current restricted websites list
 */
app.post('/update-restricted-sites-list', async (req, res) => {    
    const website = req.body
    const result = await setRestrictedSiteList({list: website})

    res.send({
        status: result
    })
})

app.listen(process.env.PORT || 3000)