import {createApp} from 'vue'
import './style.css'
import PlannerYear from './components/PlannerYear.vue'
import PlannerMonth from "./components/PlannerMonth.vue";

Date.prototype.getWeekDay = function ()
{
    const d = this.getDay()
    return d === 0 ? 7 : d
}

const locale = new Intl.Locale(window.navigator.language, {calendar: "gregory"})

// Polyfill for Firefox https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo#browser_compatibility
if (!Intl.Locale.prototype.getWeekInfo)
{
    Intl.Locale.prototype.getWeekInfo = ()=> (locale.weekInfo || {firstDay: 1, weekend: [6, 7], minimalDays: 1})
}

const now = new Date;

const params = new URLSearchParams(location.search);
const component = params.has('month') ? PlannerMonth : PlannerYear
const props = params.has('month') ? {month: now} : {year: now}

createApp(component, {locale, ...props}).mount('body')

