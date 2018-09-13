import { Vue, Provide, Component } from 'vue-property-decorator'

@Component
class Tabs extends Vue {
    @Provide() tabsList: any = [];
    @Provide() tabWidth: string = '100%';
    @Provide() translateX: string = 'translateX(0)';
    @Provide() touchDot: number = 0;
    @Provide() time: number = 0;
    @Provide() currentIndex: number = 0;
    @Provide() interval: any = null;

    onClick(index) {
        this.translateX = `translateX(${100*index}%)`
        this.currentIndex = index;
        this.$children.forEach((tabNode, tabNodeIndex) => {
            (tabNode as any).show = tabNodeIndex == index
        })
    }

    onTouchStart(event) {
        this.touchDot = event.touches[0].pageX
        this.interval = setInterval(() => {
            this.time++
        }, 100)
    }

    onTouchMove(event) {
        const tabsListLength = this.tabsList.length;
        const touchMove = event.touches[0].pageX;
        const moveDistance = touchMove - this.touchDot;
        // move left
        if (moveDistance <= -40 && this.time < 10 && this.currentIndex < tabsListLength - 1) {
            this.onClick(this.currentIndex + 1)
        }
        // move right
        if (moveDistance >= 40 && this.time < 10 && this.currentIndex > 0) {
            this.onClick(this.currentIndex - 1)
        }
    }

    onTouchEnd() {
        clearInterval(this.interval)
        this.time = 0
    }

    mounted() {
        this.$children.forEach(tab => {
            this.tabsList.push({
                title: (tab as any).title
            })
        });
        this.tabWidth = `${100 / this.tabsList.length}%`;
        (this.$children[0] as any).show = true;
    }
}

export default Tabs
