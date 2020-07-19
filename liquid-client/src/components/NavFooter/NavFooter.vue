<template>
  <nav id="action-footer">
    <ul>
      <li v-for="(button, index) in buttons" :key="index">
        <button class="btn" :disabled="button.disabled" v-on:click="button.listener">{{button.name}}</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { NavFooterService, ButtonConfig } from "./NavFooter.service";

@Component
export default class NavFooter extends Vue {
  @Prop()
  public buttons!: ButtonConfig[];

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #action-footer {
    ul {
      position: relative;
      // width: 100%;
      display: flex;
      list-style: none;
      justify-content: center;
      padding: 0;
      margin: 0;
      li {
        margin-right: 32px;
        &:last-child {
          margin-right: 0;
        }
        button {
          max-width: 300px;
        }
      }
    }
  }
</style>
