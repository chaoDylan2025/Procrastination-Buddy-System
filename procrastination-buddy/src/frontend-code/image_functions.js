import { ref } from 'vue'
import AuthenticationService from '../services/AuthenticationService'

// Image array used for carousel
export var img_arr = ref([
    "/images/d62a5d6bfa8e76f3dd36f9a51570f372.jpg",
    "/images/easy-things-hard-1024x576.jpg.webp", 
    "/images/HD-wallpaper-focus-motivational-quote-motivation-thumbnail.jpg", 
    "/images/istockphoto-1392896428-612x612.jpg",
    "/images/istockphoto-1758363728-612x612.jpg",
])

// Default images to provide for users with no images
export var default_imgs = ref([
    {image: "/images/canva-motivational-quote-about-patience-instagram-post-UJQOlc4w32w.jpg", selected: false, styling: ""}, 
    {image: "/images/istockphoto-1392896428-612x612.jpg", selected: false, styling: ""},
    {image: "/images/istockphoto-1758363728-612x612.jpg", selected: false, styling: ""}
])

// Available motivational images
export var motivational_imgs = ref([
    {image: "/images/canva-motivational-quote-about-patience-instagram-post-UJQOlc4w32w.jpg", selected: false, styling: ""},
    {image: "/images/churchhill-quote.png", selected: false, styling: ""},
    {image: "/images/d62a5d6bfa8e76f3dd36f9a51570f372.jpg", selected: false, styling: ""},
    {image: "/images/easy-things-hard-1024x576.jpg.webp", selected: false, styling: ""},
    {image: "/images/HD-wallpaper-focus-motivational-quote-motivation-thumbnail.jpg", selected: false, styling: ""},
    {image: "/images/IMG_7114.PNG", selected: false, styling: ""},
    {image: "/images/IMG_7118.JPG", selected: false, styling: ""},
    {image: "/images/IMG_7119.JPG", selected: false, styling: ""},
    {image: "/images/istockphoto-1392896428-612x612.jpg", selected: false, styling: ""},
    {image: "/images/istockphoto-1411837419-612x612.jpg", selected: false, styling: ""},
    {image: "/images/istockphoto-1758363728-612x612.jpg", selected: false, styling: ""},
    {image: "/images/istockphoto-1772150832-612x612.jpg", selected: false, styling: ""},
    {image: "/images/Luxafor-motivational-quote-image.jpg.webp", selected: false, styling: ""},
    {image: "/images/MotivationalQuote3.png", selected: false, styling: ""},
    {image: "/images/template-motivational-quote-positive-quote-success-quote-for-inspirational-self-motivation-can-be-used-for-greeting-card-typography-poster-free-vector.jpg", selected: false, styling: ""},
])

export var current_imgs = ref([]) // Current images
export var current_img_layout = ref(4) // Current image layout
export var display_confirm_btn = ref(false) // Displays 'Confirm' button if an image has been selected
export var change_image = ref(-1) // Index of image to change

// Index of current selected image
export var current_selected_img = ref(-1)
export var selected_img_index = ref(-1)

export var imageToBeViewed = ref('') // Image to view

/**
 * Changes the current user's image layout
 * 
 * @param layout -  Selected image layout
 */
export function changeImageLayout(layout){
    if(layout == "1 per row"){
        return 12
    }
    else if(layout == "3 per row"){
        return 4
    }
}

/**
 * Creates a new image url for properly displaying image
 * 
 * @param url - Current image path
 */
export function getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href
}

/**
 * Gets the image layout and images from current user
 */
export async function getImagesAndLayout(){
    let result = await AuthenticationService.updateImagesAndLayout()
    let images = result.data.images

    if(images == ""){
        console.log("Current images are missing")
        await setDefaultImages()
    }

    return result.data
}

/**
 * Sets the default motivational images for new user
 * 
 * @param email - Current user's email address
 */
export async function setDefaultImages(email){
    await AuthenticationService.settingDefaultImages(email, {images: default_imgs.value}).then((result) => {
        if(result.data.status){
            return true
        }
    })
}