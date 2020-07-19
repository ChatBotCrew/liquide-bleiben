<template>
  <div id="app">
    <NavHeader></NavHeader>
    <div class="container" ref="container">
      <router-view @updateStatus="updateStatus" />
    </div>
    <NavFooter v-bind:buttons="buttons"></NavFooter>
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

  $refs: any;

  updateStatus(buttons: ButtonConfig[]) {
    this.buttons = buttons;
  }

  mounted() {
    FinderService.loadStatusFromUrl();
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
    overflow: auto;
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

