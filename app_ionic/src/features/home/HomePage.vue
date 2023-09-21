<template>
    <v-app-bar>
        <template v-slot:prepend>
            <v-app-bar-title>App Ionic</v-app-bar-title>
        </template>
        <template v-slot:append>
            <span class="mx-2">Simulate Async</span>
            <v-switch hide-details inset color="primary" v-model="isSimulateAsync" />
        </template>

        <template v-slot:extension>
            <v-tabs v-model="tabModel" grow>
                <v-tab value="tab1">Tab 1</v-tab>
                <v-tab value="tab2">Tab 2</v-tab>
            </v-tabs>
        </template>
    </v-app-bar>

    <v-main>
        <v-window v-model="tabModel" class="h-100">
            <v-window-item value="tab1">
                <HomeTabViewContainer title="Tab View 1" :repository="generator"></HomeTabViewContainer>
            </v-window-item>

            <v-window-item value="tab2">
                <HomeTabViewContainer title="Tab View 2" :repository="generator"></HomeTabViewContainer>
            </v-window-item>
        </v-window>
    </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeDataRepository, HomeDataRandomGeneratorService } from './HomeData';
import HomeTabViewContainer from './HomeTabViewContainer.vue';

const isSimulateAsync = ref(false)
const tabModel = ref(null);

const generator: HomeDataRepository = new HomeDataRandomGeneratorService({
    size: 500,
    minX: 0,
    maxX: 100,
    minY: 0,
    maxY: 10,
    simulateAsync: isSimulateAsync,
});
</script>