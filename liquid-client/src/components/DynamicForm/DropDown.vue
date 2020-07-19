<template>
  <div class="dropdown" v-bind:class="{open: open}">
    <!-- <div class="content"> -->
    <button class="selector" v-bind:class="{active: value != null}" v-on:click="toggle()">
      <span class="content" v-html="buttonText"></span>
      <div class="arrow-box">
        <div class="arrow">
          <img src="@/assets/arrow.svg" alt />
        </div>
      </div>
    </button>
    <div class="options">
      <!-- <button v-on:click="toggle()" class="select">{{value? config.options[value-1].key: 'bitte wählen'}}</button> -->
      <label
        v-for="(option, index) in config.options"
        :key="index"
        v-bind:class="{ active: option.value == value }"
      >
        <!-- v-bind:class="{closed: true}" -->
        <input type="radio" :id="config.key+'_'+index" :value="option.value" v-model="value" />
        <span v-html="option.key"
         v-on:click="toggle()"></span>
      </label>
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderService } from "../../shared/services/finder.service";

@Component
export default class DropDown extends Vue {
  private status: any;
  @Prop() private config!: any;
  private value: any = null;

  public buttonText: string = "bitte wählen";

  mounted() {
    this.status = {};
    this.value = FinderService.getValue(this.config.key);
    this.open = false;
  }

  public open: boolean = false;

  toggle() {
    this.open = !this.open;
  }

  loadValueFromStatus() {
    if (!!this.status) {
      return this.status.value;
    }
    return null;
  }

  setActive(val: boolean) {
    this.status.isActive = val;
    this.validate(this.value);
    this.emitStatusChange(this.status);
  }
  @Watch("value")
  valueChanged(newVal: any) {
    this.buttonText = newVal
      ? this.config.options[newVal - 1].key
      : "bitte wählen";

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
.dropdown {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 80px auto;
  font-size: 20px;
  background-color: var(--white);
  border: 2px solid var(--secondary);
  border-radius: 8px;
  height: 80px;
  transition: 0.5s height;
  overflow: hidden;
  &.open {
    height: 300px;
    button .arrow-box .arrow {
            transform: scale(0.4)translateY(28px)rotate(-180deg);
    }

  }

  .options {
    overflow: auto;
    border-top: 2px #007d8c solid;
  }
  .options > *,
  button {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
  }
  label {
    transition: 0.5s color, 0.5s background-color;
    font-size: 18px;
    &.active {
      background-color: var(--secondary);
      color: var(--white);
    }
  }
  button {
    position: relative;
    background: none;
    border: none;
    outline: none !important;
    height: 80px;
    transition: 0.5s color, 0.5s background-color;
    &.active {
      background-color: var(--secondary);
      color: var(--white);
    }
    .arrow-box {
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      height: 80px;
      background-color: var(--secondary);
      .arrow {
        transition: 0.5s transform;
            transform: scale(0.4)translateY(40px);
      }
    }
  }
  input {
    display: none;
  }
}
</style>
