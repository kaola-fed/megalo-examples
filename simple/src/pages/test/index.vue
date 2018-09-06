<template>
    <div>
        <kl-tabs>
            <kl-tab title="标签一">Hello megola tab1!</kl-tab>
            <kl-tab title="标签二">Hello megola tab2!</kl-tab>
            <kl-tab title="标签三">Hello megola tab3!</kl-tab>
        </kl-tabs>
    </div>
</template>

<script>
    import Tabs from '@/components/tabs'
    import Tab from '@/components/tab'
    export default {
        mpType: 'page',
        components: {
            'kl-tabs': Tabs,
            'kl-tab': Tab
        }
    }
</script>

<style lang="scss">
@import "@/styles/mixins/index.scss";
</style>
