import {createApp, h, resolveComponent} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import './style.css'
import PlannerYear from './components/PlannerYear.vue'
import PlannerMonth from './components/PlannerMonth.vue'

Date.prototype.getWeekDay = function ()
{
    const d = this.getDay()
    return d === 0 ? 7 : d
}

const locale = new Intl.Locale(window.navigator.language, {calendar: "gregory"})

// Polyfill for Firefox https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo#browser_compatibility
if (!Intl.Locale.prototype.getWeekInfo)
{
    Intl.Locale.prototype.getWeekInfo = ()=> (locale.weekInfo || {firstDay: 7, weekend: [6, 7], minimalDays: 1})
}

const now = new Date;

const routes = [
    {path: '/', component: PlannerYear, props: {locale, now, year: now}},
    {path: '/:year', component: PlannerYear, props: route => ({locale, now, year: new Date(Date.parse(route.params.date))})},
    {path: '/:year/:month', component: PlannerMonth, props: route => ({locale, now, month: new Date(route.params.year, route.params.month-1)})},
]

const router = createRouter({routes, history: createWebHashHistory()})

createApp({render: () => h(resolveComponent('router-view'))}).use(router).mount('#app')
