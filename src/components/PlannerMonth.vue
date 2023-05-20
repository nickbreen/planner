<script setup>
import PlannerDay from "./PlannerDay.vue";

const props = defineProps({
  locale: String,
  now: Date,
  month: Date,
  fmt: String,
})

const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]
    .map(i => new Date(2023, 4, i + 1)) // a month with Monday as the 1st
    .map(d => d.toLocaleString(props.locale, {weekday: props.fmt}));

const dayOfWeekIndex = daysOfWeek.reduce((a, d, i) =>
{
  a[d] = i;
  return a
}, {})

function dayOfWeekLookup(d)
{
  return dayOfWeekIndex[d.toLocaleString(props.locale, {weekday: props.fmt})]
}

function* days()
{
  const day = new Date(props.month)
  for (
      day.setDate(1);
      day.getMonth() === props.month.getMonth();
      day.setDate(day.getDate() + 1))
  {
    yield new Date(day);
  }
}
</script>

<template>
  <header v-text="month.toLocaleString(locale, {month: 'long'})"/>
  <article class="month" >
    <section class="day-of-week" v-for="day in daysOfWeek" v-text="day"/>
    <planner-day v-for="day in days()"
                  :class="`day-of-week-${(1+dayOfWeekLookup(day))}`"
                  :now="now" :day="day" :locale="locale" :daysOfWeek="daysOfWeek"/>
  </article>
</template>

<style scoped>
header {
  line-height: calc(6 * 12pt);
  font-size: calc(3 * 12pt);
  font-weight: normal;
  text-align: center;
}

.month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: calc(2 * 12pt);
  grid-auto-rows: calc(6 * 12pt);
  grid-gap: 3pt;
  background: bisque;
  padding: 3pt;
  break-before: avoid-page;
  break-inside: avoid;
  page-break-after: always;
}

.day-of-week {
  padding: 3pt;
  text-align: center;
  background: #fff;
}

.day-of-week:nth-child(6),
.day-of-week:nth-child(7),
.day-of-week-6,
.day-of-week-7 {
  background: beige;
}

.day-of-week-1 {
  grid-column: 1;
}

.day-of-week-2 {
  grid-column: 2;
}

.day-of-week-3 {
  grid-column: 3;
}

.day-of-week-4 {
  grid-column: 4;
}

.day-of-week-5 {
  grid-column: 5;
}

.day-of-week-6 {
  grid-column: 6;
}

.day-of-week-7 {
  grid-column: 7;
}
</style>