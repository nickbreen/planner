<script setup>
const props = defineProps({
  now: Date,
  day: Date,
  locale: String,
})

const today = props.day.getMonth() === props.now.getMonth() && props.day.getDate() === props.now.getDate()

</script>

<template>
  <section class="day" :class="{today}" v-text="day.toLocaleString(locale, {day: 'numeric'})"/>
</template>

<style scoped>
.day
{
  background: #fff;
  padding: 3pt;
}
.today
{
  border: 1pt solid tomato;
}
</style>