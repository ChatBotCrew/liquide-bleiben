<template>
  <nav id="action-footer">
    <button
      class="btn"
      v-for="(button, index) in buttons"
      :key="index"
      :disabled="button.disabled"
      v-on:click="button.listener"
    >{{button.name}}</button>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ButtonConfig } from "./ButtonConfig.class";

@Component
export default class NavFooter extends Vue {
  @Prop()
  public buttons!: ButtonConfig[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#action-footer {
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;
  padding: 16px 0;
  max-width: 1024px;
  button {
    margin-bottom: 16px;
    &:last-child {
      margin: 0;
    }
  }
  @media (min-width: 700px) {
    flex-direction: row;
    button {
      width: calc(50% - 8px);
      margin: 0 16px 0 0;
    }
  }
  @media (min-width: 1024px) {
    margin-left: calc(50% - 0.5 * 1024px);
  }
}
</style>
