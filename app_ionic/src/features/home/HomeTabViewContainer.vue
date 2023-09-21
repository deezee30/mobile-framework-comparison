<template>
    <v-container class="px-5 py-10">
        <div>{{ props.title }}</div>
        <apexchart type="line" :options="options" :series="series" :style="{ position: 'absolute' }">
        </apexchart>
        <v-progress-circular v-if="isLoading" indeterminate color="primary" size="36" width="3"
            class="mx-auto w-100 my-16"></v-progress-circular>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VProgressCircular } from 'vuetify/lib/components/index.mjs';
import { HomeDataRepository } from './HomeData';

const props = defineProps(['title', 'repository']);
const repo: HomeDataRepository = props.repository;
const isLoading = ref(true);
const series = ref([{
    name: props.title,
    data: [] as [number, number][],
}]);
onMounted(() => {
    repo.getData().then((newData) => {
        isLoading.value = false;
        series.value = [{
            name: props.title,
            data: newData,
        }];
    });
});

const options = {
    chart: {
        id: props.title,
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        min: repo.minX,
        max: repo.maxX,
        tickAmount: 5,
        title: {
            text: "x",
        }
    },
    yaxis: {
        min: repo.minY,
        max: repo.maxY,
        tickAmount: 5,
        decimalsInFloat: 0,
        title: {
            text: "y",
        }
    },
};
</script>