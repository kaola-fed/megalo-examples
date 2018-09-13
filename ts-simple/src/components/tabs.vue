<template>
    <div class="kl-tabs">
        <ul class="kl-tabs__header">
            <li class="kl-tabs__header-tab--line" :style="{transform: translateX, width: tabWidth}"></li>
            <li class="kl-tabs__header-tab" :style="{width: tabWidth}" @click="onClick(index)" v-for="(tab, index) in tabsList" :key="index">{{tab.title}}</li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'kl-tabs',
        mounted() {
            this.$children.forEach(tab => {
                this.tabsList.push({
                    title: tab.title
                })
            });
            this.tabWidth = `${100 / this.tabsList.length}%`;
            this.$children[0].show = true;
        },
        data() {
            return {
                tabsList: [],
                tabWidth: '100%',
                translateX: 'translateX(0)'
            }
        },
        methods: {
            onClick(index) {
                this.translateX = `translateX(${100*index}%)`
                this.$children.forEach((tabNode, tabNodeIndex) => {
                    tabNode.show = tabNodeIndex == index
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "@/styles/mixins/index.scss";
    @include b(kl-tabs) {
        background: #fff;
        @include e(header) {
            position: relative;
        }
        @include e(header-tab) {
            border-bottom:1px solid #eee;
            font-size: 14px;
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            min-width: 104px;
            padding: 0 15px;
            color: #333;
            text-align: center;
            cursor: pointer;
            @include m(line) {
                z-index: 1;
                position: absolute;
                left: 0;
                bottom: 1px;
                box-sizing: border-box;
                height: 2px;
                background-color: #1890ff;
                transform-origin: 0 0;
                transition: all 0.2s;
            }
        }
    }
    .kl-tabs {
    }
    .kl-tabs__header {
    }
    .kl-tabs__header-tab {
    }
</style>
