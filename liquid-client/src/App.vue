<template>
  <div id="app">
    <NavHeader></NavHeader>
    <OverlayScrollbarsComponent
      class="view"
      :options="{ scrollbars: { autoHide: 'scroll' } }"
      :extensions="[]"
    >
      <div class="contend">
        <router-view @updateStatus="updateStatus" />
        <NavFooter v-bind:buttons="buttons"></NavFooter>
      </div>
    </OverlayScrollbarsComponent>
    <!-- <div class="container" v-bind:class="{ 'onscroll': scrollMode }" ref="container">
      
    </div>-->
  </div>
</template>

<script lang="ts">
import { ButtonConfig } from "./components/NavFooter/ButtonConfig.class";
import { Component, Prop, Vue } from "vue-property-decorator";
import NavHeader from "./components/NavHeader.vue";
import NavFooter from "./components/NavFooter/NavFooter.vue";
import { FinderService } from "./shared/services/finder.service";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

@Component({
  components: { NavHeader, NavFooter, OverlayScrollbarsComponent }
})
export default class App extends Vue {
  public buttons: ButtonConfig[] = [];
  public scrollMode: boolean = true;

  $refs: any;

  updateStatus(buttons: ButtonConfig[]) {
    this.buttons = buttons;
  }

  mounted() {
    FinderService.loadStatusFromUrl();
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss";
#app {
  display: flex;
  flex-direction: column;
  .view {
    // TODO: custom styling https://kingsora.github.io/OverlayScrollbars/#!documentation/styling
    margin-top: 86px;
    height: calc(100vh - 86px);
    padding: 0;
    &.onscroll {
      margin-right: calc(100vw - 100%);
    }
    @media (min-width: 700px) {
      margin-top: 120px;
      height: calc(100vh - 120px);
    }
    @media (min-width: 1024px) {
      // padding: 0 64px;
    }
    .contend {
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      > * {
        width: 100%;
      }
      @media (min-width: 700px) {
        > * {
          width: calc(100% - 32px);
          max-width: 900px;
        }
      }
    }
  }
}
// $extra-small: 700px; xs
// $small: 200px; s
// $medium: 400px; m
// $large: 500px; l
// $extra-large: 1000px; xl
</style>

