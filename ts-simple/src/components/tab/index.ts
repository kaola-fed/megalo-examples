import { Vue, Provide, Prop, Component } from 'vue-property-decorator'


@Component
class Tab extends Vue {
    @Prop() title: string;

    @Provide() show: boolean = false;
}

export default Tab
