<template>
  <div class="dynamic-form">
    <!-- <VerticalSelect
      v-if="!!config && config.type == 'select'"
      v-bind:config="config"
      v-on:status="getStatus"
    ></VerticalSelect> -->
    <DropDown
      v-if="!!config && config.type == 'select'"
      v-bind:config="config"
      v-on:status="getStatus"
    ></DropDown>
    <Input
      v-if="!!config && config.type == 'input'"
      v-bind:config="config"
      v-on:status="getStatus"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import VerticalSelect from "./DynamicForm/VerticalSelect.vue";
import Input from "./DynamicForm/Input.vue";
import DropDown from "./DynamicForm/DropDown.vue";

@Component({
  components: {
    VerticalSelect,
    Input,
    DropDown
  }
})
export default class DynamicForm extends Vue {
  @Prop() public config: any;
  mounted() {
  }
  @Emit("status")
  getStatus(status: any) {
    return status;
  }
}
</script>

<style scoped lang="scss">
.dynamic-form {
  padding: 0 32px;
}
</style>
