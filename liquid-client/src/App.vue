<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container" ref="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import { FinderService } from "./shared/services/finder.service";

@Component({
  components: { Navbar }
})
export default class App extends Vue {

  $refs: any;

  mounted() {
    FinderService.loadStatusFromUrl();
    
  }
  beforeUpdate() {
    console.log(this.$refs.container.clientHeight);
    console.log(this.$refs.container.scrollHeight);
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss";
#app {

  .container {
    margin-top: 120px;
    height: calc(100vh - 120px);
  }
}
</style>
