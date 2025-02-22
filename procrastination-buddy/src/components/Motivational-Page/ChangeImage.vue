<script setup>
import AuthenticationService from '../../services/AuthenticationService'
import {ref} from 'vue'
import { img_arr, getImageUrl } from '../../code/image_functions'

const props = defineProps({
    open_change_image_dialog: Boolean
})

// Contains current images
var current_images_arr = ref(["/images/IMG_7112.JPG", "/images/IMG_7113.JPG", "/images/IMG_7117.WEBP", 
"/images/MotivationalQuote.png","/images/ProcrastinationQuote.png", "../assets/images/einstein.png.webp",
"../assets/images/getty_506910700_160576.webp", "../assets/images/IMG_7114.PNG", "../assets/images/IMG_7118.JPG",
"../assets/images/IMG_7119.JPG", "../assets/images/MotivationalQuote2.png", "../assets/images/MotivationalQuote3.png"])

const emit = defineEmits('close')
function exitDialogModal(){
    emit('close', false)
}
</script>

<template>
    <v-app>
        <v-dialog
        v-model="props.open_change_image_dialog"
        height="800"
        width="1000">
            <v-card>
                <v-card-item>
                    <v-btn
                        @click="exitDialogModal"
                        icon="$close"
                        size="medium"
                        variant="text"
                        >
                        </v-btn>
                </v-card-item>

                <v-container>
                    <Content :show_change_button="props.open_edit_dialog"/>
                </v-container> 
            </v-card>
        </v-dialog>
    </v-app>

</template>