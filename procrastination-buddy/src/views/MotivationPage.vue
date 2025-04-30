<script setup>
import {ref} from 'vue'
import Content from '../components/Motivational-Page/Content.vue'

// Opens Edit Content dialog
var open_edit_content_dialog = ref(false)

// Contains options for changing image layout
var image_layout_options = ["1 image per row", "3 images per row", "5 images per row"]
</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays option to change image layout -->
             <v-row>
                <v-col></v-col>
                <v-col class="mt-5 text-center">
                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn
                            size="small"
                            v-bind="props"
                            >
                            Change layout
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(item, index) in image_layout_options"
                            :key="index"
                            :value="item"
                            @click=""
                            >
                                {{ item }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col></v-col>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <v-col>
                    <Content :show_change_button="true"/>
                </v-col>
                
             </v-row>
             <EditContent :open_edit_dialog="open_edit_content_dialog" @close="(state) => open_edit_content_dialog = state"/>
        </v-container>
    </v-app>
    
</template>