import {createApp} from 'vue'
import './style.css'
import PlannerYear from './components/PlannerYear.vue'

createApp(PlannerYear, {
    now: location.hash ? new Date(...location.hash.slice(1).split(/\D/)) : new Date,
    locale: window.navigator.language
}).mount('#app')
