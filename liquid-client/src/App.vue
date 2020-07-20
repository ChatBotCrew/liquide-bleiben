<template>
  <div id="app">
    <NavHeader></NavHeader>
    <div class="container" v-bind:class="{ 'onscroll': scrollMode }" ref="container">
      <router-view @updateStatus="updateStatus" />
      <NavFooter v-bind:buttons="buttons"></NavFooter>
    </div>
  </div>
</template>

<script lang="ts">
import { ButtonConfig } from "./components/NavFooter/ButtonConfig.class";
import { Component, Prop, Vue } from "vue-property-decorator";
import NavHeader from "./components/NavHeader.vue";
import NavFooter from "./components/NavFooter/NavFooter.vue";
import { FinderService } from "./shared/services/finder.service";

@Component({
  components: { NavHeader, NavFooter }
})
export default class App extends Vue {
  public buttons: ButtonConfig[] = [];
  public scrollMode: boolean = true;

  $refs: any;

  updateStatus(buttons: ButtonConfig[]) {
    this.buttons = buttons;
  }

  onResize() {
      this.scrollMode = this.$refs.container.clientHeight < this.$refs.container.scrollHeight;
  }

  mounted() {
    window.addEventListener('resize', ()=>{
      this.onResize();
    })
    this.onResize();
    FinderService.loadStatusFromUrl();
    // this.$refs.addEventListener('onresize', ()=>{
    //   console.log(123);
      
    // })
    
  }
  beforeUpdate() {
    // console.log(this.$refs.container.clientHeight);
    // console.log(this.$refs.container.scrollHeight);
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss";
#app {
  display: flex;
  flex-direction: column;
  .container {
    margin-top: 120px;
    height: calc(100vh - 120px);
    overflow-y: auto;
    margin-right: 17px;
    margin-left: 17px;
    &.onscroll {
      // width: calc(100vw - 100%);
      margin-right: calc(100vw - 100%);
    }
    // max-width: $extra-small;
    // @media (max-width: 1000px) {

    // }
  }
}
// $extra-small: 700px; xs
// $small: 200px; s
// $medium: 400px; m
// $large: 500px; l
// $extra-large: 1000px; xl
</style>

