<script setup>
import PlannerMonth from "./PlannerMonth.vue";

const props = defineProps({
  locale: String,
  now: Date,
})

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .map(i => new Date(props.now.getFullYear(), i))

</script>

<template>
  <main class="year" :data-year="now.toLocaleString(locale, {year: 'numeric'})">
    <planner-month v-for="(month, m) in months" :month="month" :now="now" :locale="locale" fmt="short"/>
  </main>
</template>

<style scoped>
.year {
  string-set: year attr(data-year);
}
</style>
