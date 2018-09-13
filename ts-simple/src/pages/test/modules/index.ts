import Tabs from '@/components/tabs.vue'
import Tab from '@/components/tab.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {
        'kl-tabs': Tabs,
        'kl-tab': Tab
    }
})

class App extends Vue {
    onLaunch() {
        console.log('launch');
    }
}

export default App
