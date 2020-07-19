<template>
  <div class="result-list">
    <nav v-if="categories.length > 0">
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          <button v-on:click="currentCategory = category">{{category.name}}<span v-if="category.offers.length > 0">{{category.offers.length}}</span></button>
        </li>
      </ul>
    </nav>
    <!-- {{currentCategory}} -->
    <ResultCard v-for="(offer, index) in currentCategory.offers" :key="index" v-bind:offer=offer />
    <span v-html="currentCategory.description"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ResultCard from "./ResultCard.vue";

@Component({
  components: {
    ResultCard
  }
})
export default class ResultList extends Vue {
  @Prop() public categories!: any[];
  public currentCategory: any = {};

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result-list {
}
</style>
