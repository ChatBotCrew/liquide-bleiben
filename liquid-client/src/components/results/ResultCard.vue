<template>
  <div class="result-card">
    <h3>{{offer.name}}</h3>
    <ul>
      <li v-for="(field, i) in offer.fields.main" :key="'main'+i">
        <span class="name">{{field.name}}:</span>
        <span class="value" v-html="field.value"></span>
      </li>
      <!-- <li v-for="(field, index) in offer.fields.details" :key="'details'+index">
        {{field}}
      </li>-->
    </ul>
    <span class="details">
      Details:
      <router-link :to="link">ansehen</router-link>
    </span>
    <!-- {{offer}} -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResultCard extends Vue {
  @Prop() public offer!: any;
  @Prop() public link!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result-card {
  background-color: var(--brown);
  border: 2px white solid;
  border-radius: 8px;
  padding: 32px 16px 16px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 32px;
        }
      }
    }
  }
  .details {
  }
}
</style>
