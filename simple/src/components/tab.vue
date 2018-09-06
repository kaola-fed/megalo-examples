<template>
    <div v-if="show"><slot></slot></div>
</template>

<script>
    export default {
        name: 'kl-tab',
        props: {
            title: ''
        },
        data() {
            return {
                show: false,
            }
        },
        mounted() {

        },
    }
</script>