<script setup>
const props = defineProps({
    locale: Intl.Locale,
    month: Date,
})

const weekInfo = props.locale.getWeekInfo();
const weekendDays = new Set(weekInfo.weekend)

function* weekDays()
{
    const day = new Date(2023, 4) // a month with Monday as the 1st
    // Stolen from https://css-tricks.com/making-calendars-with-accessibility-and-internationalization-in-mind/
    // const arr = [1, 2, 3, 4, 5, 6, 7]
    // for (let i = 0; i < 8 - weekInfo.firstDay; i++) arr.splice(0, 0, arr.pop());
    // But why not just use a literal array and slice out the week we want?
    const weekDayOrder = [0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6].slice(weekInfo.firstDay, weekInfo.firstDay + 7)
    for (var d of weekDayOrder)
    {
        day.setDate(d)
        yield {
            narrow: day.toLocaleString(props.locale, {weekday: 'narrow'}),
            text: day.toLocaleString(props.locale, {weekday: 'short'}),
            title: day.toLocaleString(props.locale, {weekday: 'long'}),
            weekend: weekendDays.has(day.getWeekDay()) || undefined
        }
    }
}

function* days()
{
    const day = new Date(props.month)
    for (
        day.setDate(1);
        day.getMonth() === props.month.getMonth();
        day.setDate(day.getDate() + 1))
    {
        yield {
            text: day.toLocaleString(props.locale, {day: 'numeric'}),
            weekend: weekendDays.has(day.getWeekDay()) || undefined,
            weekDay: day.getWeekDay()
        }
    }
}
</script>

<template>
    <div :data-month="month.toLocaleDateString(locale, {year: 'numeric', month: 'long'})">
        <ol :data-week-first-day="weekInfo.firstDay">
            <li v-for="({text, weekend, title}, i) in weekDays()" :key="i" :title="title" :data-weekend="weekend"
                v-text="text"/>
            <li v-for="({text, weekend, weekDay}, i) in days()" :key="i" :data-week-day="weekDay"
                :data-weekend="weekend" v-text="text"/>
        </ol>
    </div>
</template>

<style scoped>
[data-month]
{
    break-inside: avoid;
}

[data-month]::before
{
    content: attr(data-month);
    display: block;
    line-height: 2em;
    font-size: 2em;
    font-weight: normal;
    text-align: center;
}

[data-week-first-day]
{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 2em repeat(6, 6em);
    grid-gap: 0.2em;
    background: bisque;
    padding: 0.2em;
    list-style: none;
    margin: 0 auto;
}

[data-week-first-day] > *
{
    padding: 0.2em;
    background: #fff;
}

[data-week-first-day] > *:nth-child(n+1):nth-child(-n+7)
{
    text-align: center;
}

[data-weekend]
{
    background: beige;
}

[data-week-first-day="1"] [data-week-day="1"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="7"]:nth-child(8)
{
    grid-column: 1
}

[data-week-first-day="1"] [data-week-day="2"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="1"]:nth-child(8)
{
    grid-column: 2
}

[data-week-first-day="1"] [data-week-day="3"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="2"]:nth-child(8)
{
    grid-column: 3
}

[data-week-first-day="1"] [data-week-day="4"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="3"]:nth-child(8)
{
    grid-column: 4
}

[data-week-first-day="1"] [data-week-day="5"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="4"]:nth-child(8)
{
    grid-column: 5
}

[data-week-first-day="1"] [data-week-day="6"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="5"]:nth-child(8)
{
    grid-column: 6
}

[data-week-first-day="1"] [data-week-day="7"]:nth-child(8),
[data-week-first-day="7"] [data-week-day="6"]:nth-child(8)
{
    grid-column: 7
}
</style>