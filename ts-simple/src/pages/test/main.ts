import Vue from 'vue'
import App from './modules/index.vue'


Object.assign(App, {
    mpType: 'page'
})

const app = new Vue(App)
app.$mount()