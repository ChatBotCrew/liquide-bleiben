<template>
  <div class="result-card">
    <h3>{{offer.name}}</h3>
    <ul>
      <li v-for="(field, i) in offer.fields.main" :key="'main'+i">
        <span class="name">{{field.name}}:</span><span class="value">{{field.value}}</span>
      </li>
      <!-- <li v-for="(field, index) in offer.fields.details" :key="'details'+index">
        {{field}}
      </li> -->
    </ul>
    <!-- {{offer}} -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResultCard extends Vue {
  @Prop() public offer!: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result-card {
}
</style>
