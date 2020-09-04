<template>
  <div class="fs-result-card">
    <div class="background"></div>
    <OverlayScrollbarsComponent
      class="full-view"
      :options="{ scrollbars: { autoHide: 'scroll' } }"
      :extensions="[]"
    >
      <div class="content">
        <div class="result-card">
          <h3>{{offer.name}}</h3>
          <ul>
            <li v-for="(field, i) in offer.fields.main" :key="'main'+i">
              <span class="name">{{field.name}}:</span>
              <span class="value" v-if="!isLink(field.value)" v-html="field.value"></span>
              <span class="value" v-if="isLink(field.value)">
                <a :href="field.value">Link</a>
              </span>
            </li>
          </ul>
          <ul>
            <li v-for="(field, index) in offer.fields.details" :key="'details'+index">
              <span class="name">{{field.name}}:</span>
              <span class="value" v-if="!isLink(field.value)" v-html="field.value"></span>
              <span class="value" v-if="isLink(field.value)">
                <a :href="field.value">Link zu {{field.name}}</a>
              </span>
            </li>
          </ul>
          <!-- <span class="details">
      Details:
      <router-link :to="link">ansehen</router-link>
          </span>-->
          <!-- {{offer}} -->
        </div>
      </div>
    </OverlayScrollbarsComponent>
    <button class="close">
      <img v-on:click="close()" src="@/assets/close.svg" alt />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import { FinderService } from "../../shared/services/finder.service";
@Component({
  components: {
    OverlayScrollbarsComponent,
  },
})
export default class FullscreenResultCard extends Vue {
  @Prop() public offer!: any;
  // @Prop() public link!: string;
  close() {
    // FinderService.updateCurrentOffer(null);
    FinderService.updateValue("index", null, false);
    let query = FinderService.parseValueToUrl();
    this.$router.push({
      path: query,
    });
  }
  isLink(text: string): boolean {
    return text.startsWith("www.") || text.startsWith("http");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fs-result-card {
  &.fscard-enter-active,
  &.fscard-leave-active {
    transition: opacity 0.3s;
  }
  &.fscard-enter, &.fscard-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--prim-900);
    opacity: 0.8;
  }
  .full-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  button.close {
    position: fixed;
    z-index: 6;
    top: 16px;
    right: 16px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 12px;
    outline: none;
    img {
      display: block;
      width: 32px;
      height: 32px;
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .result-card {
    position: absolute;
    background-color: var(--brown);
    border: 2px white solid;
    border-radius: 8px;
    padding: 32px 16px 16px 16px;
    margin: 128px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 700px;
    h3 {
      font-weight: 400;
      font-size: 24px;
      border-bottom: white 2px solid;
      margin: 0 0 32px 0;
      padding: 0 0 32px 0;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        span {
          display: block;
          width: 100%;
          &.name {
            font-size: 20px;
            font-weight: 300;
            margin-bottom: 8px;
          }
          &.value {
            font-size: 24px !important;
            font-weight: 400;
            margin-bottom: 32px;
          }
        }
      }
    }
    .details {
    }
  }
}
</style>
