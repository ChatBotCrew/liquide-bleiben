<template>
  <div class="progress">
    <!-- <div class="progressbar">
      <div class="value" v-bind:style="{ 'width': progress + '%' }"></div>
    </div> -->
    <!-- {{values}} -->
    <!-- TODO: Add answers -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Progress extends Vue {
  @Prop() private values!: any;
  public get progress() {
    return 100*(this.values.index+1)/(Object.keys(this.values).length-1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.progress {
  display: block;
  background-color: red;
  // position: relative;
  // display: flex;
  // flex-direction: column;
  // min-height: 100px;
  // width: 100%;
  // .progressbar {
  //   position: relative;
  //   display: block;
  //   height: 24px;
  //   width: 100%;
  //   background-color: var(--light-grey);
  //   border-radius: 12px;
  //   overflow: hidden;
  //   .value {
  //     position: absolute;
  //     width: 40%;
  //     height: 100%;
  //     background-color: var(--prim-700);
  //     border-radius: 12px;
  //     transition: 0.5s width;
  //   }
  // }
}
</style>
