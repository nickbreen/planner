import {createApp} from 'vue'
import './style.css'
import PlannerYear from './components/PlannerYear.vue'

Date.prototype.getWeekDay = function ()
{
    const d = this.getDay()
    return d === 0 ? 7 : d
}

const locale = new Intl.Locale(navigator.language, {calendar: "gregory"})

// Polyfill for Firefox https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo#browser_compatibility
if (!Intl.Locale.prototype.getWeekInfo)
{
    Intl.Locale.prototype.getWeekInfo = function ()
    {
        return this.weekInfo || {firstDay: 1, weekend: [6, 7], minimalDays: 1}
    }
}

createApp(PlannerYear, {locale}).mount('#app')
