<template>
  <label class="input">
    <input
      type="number"
      v-model.number="value"
      :id="config.key"
      :placeholder="config.placeholder"
      @focus="setActive(true)"
      @blur="setActive(false)"
    />
    <span v-if="!!config.unit" class="unit">{{config.unit}}</span>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderService } from "../../shared/services/finder.service";

@Component
export default class Input extends Vue {
  private status: any;
  @Prop() private config!: any;
  private value:any = null;

  mounted(){
    this.status = {};
    this.value = FinderService.getValue(this.config.key);
  }

  setActive(val: boolean) {
    this.status.isActive = val;
    this.validate(this.value);
    this.emitStatusChange(this.status);
  }
  @Watch("value")
  valueChanged(newVal: any) {
    this.validate(newVal);
    this.emitStatusChange(this.status);
  }
  @Emit("status")
  emitStatusChange(status: any) {
    this.status = status;
  }
  public validate(val: any) {
    this.status.errors = [];
    this.config.validators.forEach((v: any) => {
      if (!v.isValide(val)) {
        this.status.errors.push({
          message: v.message
        });
      }
    });
    this.status.isValide = this.status.errors.length == 0;
    this.status.value = val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input {
  position: relative;
  display: flex;
  border: 2px solid #007d8c;
  border-radius: 6px;
  overflow: hidden;
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 24px;
    letter-spacing: 1px;
    color: black;
    border: none;
    outline: none !important;
  }
  .unit {
    font-size: 24px;
    display: block;
    padding: 10px 24px;
    background: #007d8c;
    color: white;
  }
}
</style>
