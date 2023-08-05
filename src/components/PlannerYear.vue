<script setup>
import {computed, ref} from "vue";
import PlannerMonth from "./PlannerMonth.vue";

defineProps({
    locale: Intl.Locale
})

const dateFromUrlHash = url => [url.hash]
    .filter(h => !!h)  // is there a hash?
    .map(h => h.slice(1))  // slice off '#'
    .filter(h => !!h)  // is there still a value?
    .map(s => new Date(s))  // parse as a date
    .filter(d => !!d.valueOf())  // exclude if invalid date
    .reduce((_, d) => d, new Date)  // default to now

const year = ref(dateFromUrlHash(location))

window.onhashchange = e => year.value = dateFromUrlHash(new URL(e.newURL))

const months = computed(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => new Date(year.value.getFullYear(), i)))
</script>

<template>
    <planner-month v-for="month in months" :key="month.getMonth()" :month="month" :locale="locale"/>
</template>

<style scoped>
</style>
