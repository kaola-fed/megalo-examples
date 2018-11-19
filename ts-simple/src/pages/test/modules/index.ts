import Tabs from '@/components/tabs/index.vue'
import Tab from '@/components/tab/index.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {
        'kl-tabs': Tabs,
        'kl-tab': Tab
    }
})

class App extends Vue {
    created() {
        console.log('created', this);
    }
    onShow() {
        console.log('onShow')
    }
}

export default App
