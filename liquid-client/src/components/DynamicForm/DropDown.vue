<template>
  <div class="dropdown">
    <!-- <div class="content"> -->
    <button
      class="toggle btn"
      v-bind:class="{active: value != null}"
      v-on:click="setInnerHeight(!open)"
    >
      <span class="content" v-html="buttonText"></span>
      <div class="arrow-box" v-bind:class="{ open: open }">
        <div class="arrow">
          <img src="@/assets/arrow.svg" alt />
        </div>
      </div>
    </button>
    <!-- <OverlayScrollbarsComponent class="options"> -->
    <!-- <button v-on:click="toggle()" class="select">{{value? config.options[value-1].key: 'bitte wählen'}}</button> -->
    <div
      class="options"
      v-bind:style="{height: height}"
      v-bind:class="{ open: open }"
      ref="options"
    >
      <label
        v-for="(option, index) in config.options"
        :key="index"
        v-bind:class="{ active: index == value }"
         v-on:click="setInnerHeight(false)"
      >
        <!-- v-bind:class="{closed: true}" -->
        <input type="radio" :id="config.key+'_'+index" :value="index" v-model="value" />
        <span v-html="option.key"></span>
      </label>
    </div>
    <!-- </OverlayScrollbarsComponent> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderService } from "../../shared/services/finder.service";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

@Component({
  components: {
    OverlayScrollbarsComponent
  }
})
export default class DropDown extends Vue {
  private status: any;
  @Prop() private config!: any;
  private value: any = null;
  private height = "0";

  public buttonText: string = "bitte wählen";

  setInnerHeight(open: boolean) {
    this.open = open;
    this.height = !this.open
      ? "0px"
      : this.$refs.options["scrollHeight"] + "px";
    console.log(this.height);
  }

  mounted() {
    this.status = {};
    this.value = this.findOptionIndex(FinderService.getValue(this.config.key));
    this.open = false;
    this.valueChanged(this.value);
    window.addEventListener("resize", () => {
      this.setInnerHeight(this.open);
    });
  }

  public findOptionIndex(value: any): number {
    for (let i = 0; i < this.config.options.length; i++) {
      if (this.config.options[i].value == value) {
        return i;
      }
    }
    return null;
  }

  public open: boolean = false;

  setActive(val: boolean) {
    this.status.isActive = val;

    this.validate(this.value);
    this.emitStatusChange(this.status);
  }
  @Watch("value")
  valueChanged(id: number) {
    let option = this.config.options[id];
    this.buttonText = id != null ? option.key : "bitte wählen";

    this.validate(id != null ? option.value : null);
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
  display: flex;
  flex-direction: column;
  label {
    border: none;
    border-radius: 6px;
    padding: 16px;
    letter-spacing: 1px;
    font-weight: 500;
    color: black;
    background-color: #ffffff;
    font-size: 1.5rem;
    outline: none !important;
    margin-top: 8px;
    text-align: center;
    cursor: pointer;
    &.active {
      color: var(--white);
      background-color: var(--secondary);
    }
  }
  input {
    display: none;
  }
  .btn {
    display: grid;
    grid-template-columns: auto 24px;
    .arrow-box {
      .arrow {
        transform: rotate(360deg);
        transition: transform 0.5s;
      }
      &.open .arrow {
        transform: rotate(180deg);
      }
    }
  }
}
.options {
  display: flex;
  flex-direction: column;
  // height: 0;
  overflow: hidden;
  transition: 0.5s height;
}
</style>
