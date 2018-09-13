import { Vue, Provide, Prop } from 'vue-property-decorator'


class Tab extends Vue {
    @Prop() title: string;

    @Provide() show: boolean = false;
}

export default Tab
