import { Vue, Component } from 'vue-property-decorator'

Component.registerHooks([
    'onLaunch'
])

@Component
class App extends Vue {
    onLaunch() {
        console.log('launch');
    }
}

export default App
