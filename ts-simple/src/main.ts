import App from './app.vue'
import Vue from 'vue'

Object.assign(App, {
    mpType: 'page'
})
const app = new Vue(App)

app.$mount('#app')

export default {
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
            "pages/test/main",
        ],
        "window": {
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "template",
            "navigationBarTextStyle": "black"
        }
    }
}