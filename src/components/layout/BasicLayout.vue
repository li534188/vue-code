<template>
  <a-layout theme="dark" id="components-layout-demo-top" class="layout">
    <a-layout-header class="basic-layout" >
      <slot name="header" />
    </a-layout-header>
    <a-layout-content  theme="dark">
      <div :style="{ background: '#fff', height: '100%'}">
        <slot name="content" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center;padding:1rem 50px">
      {{`© ${date} Data Analysis Incorporated. All rights reserved.`}}
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" >
import {  Vue, } from 'vue-class-component';
import moment from 'moment';
export default class BasicLayout extends Vue {
  private date = moment(new Date()).year()
}
</script>
<style scoped>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin:  0;
  float: left;
}

#components-layout-demo-top{
    height: 100%;
}

.basic-layout{
  background: #193442;
  height: 78px;
  padding: 0 ;
  line-height: 78px;
}

</style>