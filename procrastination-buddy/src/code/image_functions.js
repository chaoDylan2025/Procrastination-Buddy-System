import { ref } from 'vue'

// Image array used for carousel
export var img_arr = ref([
    "/images/IMG_7112.JPG",
    "/images/IMG_7113.JPG", 
    "/images/IMG_7117.WEBP", 
    "/images/MotivationalQuote.png",
    "/images/ProcrastinationQuote.png",
])

// Current images for debugging
export var current_imgs = ref([
    getImageUrl("../assets/images/HD-wallpaper-focus-motivational-quote-motivation-thumbnail.jpg"), 
    getImageUrl("../assets/images/churchhill-quote.png"),
    getImageUrl("../assets/images/istockphoto-1758363728-612x612.jpg")
])

// Displays 'Confirm' button if an image has been selected
export var display_confirm_btn = ref(false)
// Index of currently selected image
export var current_selected_img = ref(-1)

// Available motivational images
export var motivational_imgs = ref([
    getImageUrl("../assets/images/canva-motivational-quote-about-patience-instagram-post-UJQOlc4w32w.jpg"),
    getImageUrl("../assets/images/churchhill-quote.png"),
    getImageUrl("../assets/images/d62a5d6bfa8e76f3dd36f9a51570f372.jpg"),
    getImageUrl("../assets/images/easy-things-hard-1024x576.jpg.webp"),
    getImageUrl("../assets/images/HD-wallpaper-focus-motivational-quote-motivation-thumbnail.jpg"),
    getImageUrl("../assets/images/IMG_7114.PNG"),
    getImageUrl("../assets/images/IMG_7118.JPG"),
    getImageUrl("../assets/images/IMG_7119.JPG"),
    getImageUrl("../assets/images/istockphoto-1392896428-612x612.jpg"),
    getImageUrl("../assets/images/istockphoto-1411837419-612x612.jpg"),
    getImageUrl("../assets/images/istockphoto-1758363728-612x612.jpg"),
    getImageUrl("../assets/images/istockphoto-1772150832-612x612.jpg"),
    getImageUrl("../assets/images/Luxafor-motivational-quote-image.jpg.webp"),
    getImageUrl("../assets/images/MotivationalQuote3.png"),
    getImageUrl("../assets/images/template-motivational-quote-positive-quote-success-quote-for-inspirational-self-motivation-can-be-used-for-greeting-card-typography-poster-free-vector.jpg"),
])

export function changeImageLayout(layout){
    if(layout == "1 per row"){
        return 12
    }
    else if(layout == "3 per row"){
        return 4
    }
}

export function getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href
}