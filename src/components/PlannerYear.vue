<script setup>
import PlannerMonth from "./PlannerMonth.vue";

const props = defineProps({
    locale: Intl.Locale,
    year: Date,
})

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .map(i => new Date(props.year.getFullYear(), i))

</script>

<template>
    <planner-month v-for="month in months" :key="month.getMonth()" :month="month" :locale="locale"/>
</template>

<style scoped>
</style>
