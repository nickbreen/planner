import {createApp, h, resolveComponent} from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import './style.css'
import PlannerYear from './components/PlannerYear.vue'

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

const routes = [
    {path: '/', component: PlannerYear, props: {locale, now: new Date}},
    {path: '/:date', component: PlannerYear, props: route => ({locale, now: new Date(Date.parse(route.params.date))})},
]

const router = createRouter({routes, history: createWebHashHistory()})

createApp({render: () => h(resolveComponent('router-view'))}).use(router).mount('#app')
