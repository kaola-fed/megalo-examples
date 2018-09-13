<template>
    <div class="kl-tabs">
        <ul class="kl-tabs__header">
            <li class="kl-tabs__header-tab--line" :style="{transform: translateX, width: tabWidth}"></li>
            <li class="kl-tabs__header-tab" :style="{width: tabWidth}" @click="onClick(index)" v-for="(tab, index) in tabsList" :key="index">{{tab.title}}</li>
        </ul>
        <div class="kl-tabs__body"
            @touchstart="onTouchStart($event)"
            @touchend="onTouchEnd($event)"
            @touchmove="onTouchMove($event)"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss">
    @import "./index";
</style>
