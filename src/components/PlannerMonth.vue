<script setup>
const props = defineProps({
    locale: Intl.Locale,
    now: Date,
    month: Date,
})

const weekInfo = props.locale.getWeekInfo();
const weekendLookup = weekInfo.weekend.reduce((acc, day) =>
{
    acc[day] = true;
    return acc
}, {})

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
            short: day.toLocaleString(props.locale, {weekday: 'short'}),
            long: day.toLocaleString(props.locale, {weekday: 'long'}),
            isWeekend: weekendLookup[day.getWeekDay()]
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
            title: day.toString(),
            text: day.toLocaleString(props.locale, {day: 'numeric'}),
            isWeekend: weekendLookup[day.getWeekDay()],
            isToday: day.getMonth() === props.now.getMonth() && day.getDate() === props.now.getDate() || undefined,
            weekDay: day.getWeekDay()
        }
    }
}
</script>

<template>
    <div :data-month="month.toLocaleString(locale, {month: 'long'})" :data-year="month.toLocaleString(locale, {year: 'numeric'})">
        <ol :data-week-first-day="weekInfo.firstDay">
            <li v-for="{isWeekend, long, short} in weekDays()" :data-weekend="isWeekend" :title="long" v-text="short"/>
            <li v-for="{title, text, isWeekend, isToday, weekDay} in days()" :data-today="isToday" :data-week-day="weekDay"
                :data-weekend="isWeekend" :title="title" v-text="text"/>
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
    content: attr(data-month) "\a0" attr(data-year);
    display: block;
    line-height: 2em;
    font-size: 3em;
    font-weight: normal;
    text-align: center;
}

[data-week-first-day]
{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 2em repeat(6, 5em);
    grid-gap: 0.25em;
    background: bisque;
    padding: 0.25em;
    list-style: none;
}

[data-week-first-day] > *
{
    padding: 0.25em;
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

@media screen
{
    [data-today]
    {
        border: 0.25em solid tomato;
    }
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