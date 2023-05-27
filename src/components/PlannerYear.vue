<script setup>
import PlannerMonth from "./PlannerMonth.vue";

const props = defineProps({
  locale: Intl.Locale,
  now: Date,
})

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .map(i => new Date(props.now.getFullYear(), i))

</script>

<template>
  <main :data-year="now.toLocaleString(locale, {year: 'numeric'})">
    <planner-month v-for="month in months" :month="month" :now="now" :locale="locale"/>
  </main>
</template>

<style scoped>
[data-year] {
  string-set: year attr(data-year);
}
main
{
  columns: 2
}
</style>
