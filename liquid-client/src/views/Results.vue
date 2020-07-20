<template>
  <div class="about">
    <h1>{{$router.currentRoute.meta.title}}</h1>
    <ResultList v-if="!!categories" v-bind:categories="categories" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ResultList from "../components/ResultList.vue";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FinderService } from "../shared/services/finder.service";
import { ButtonConfig } from "../components/NavFooter/ButtonConfig.class";

@Component({
  components: {
    ResultList
  }
})
export default class Results extends Vue {
  @Prop() private msg!: string;
  public categories: any[] = [];
  public descriptions: any[] = [];

  backToResults() {
    FinderService.updateValue("index", 0, false);
    this.$router.push({
      path: "/finder" + FinderService.parseValueToUrl()
    });
  }
  @Emit("updateStatus")
  updateStatus(): ButtonConfig[] {
    return [new ButtonConfig("Zurück zum Finder", false, () => {
      this.backToResults();
    })];
  }

  mounted() {
    this.updateStatus();
    FinderService.loadStatusFromUrl();
    let results: any;
    let descriptions: any;
    let categories: any[] = [];
    let ifDone = () => {
      // console.log('ifDone');
      // console.log(descriptions, results);
      
      descriptions.forEach((description:any) => {
        let category = {
          name: description.name,
          description: description.html,
          offers: [],
        }
        results.forEach((result:any) => {
          if(result.name == description.name){
            category.offers = result.offers;
          }
        });
        categories.push(category);
      });
      this.categories = categories;
      console.log(categories);
      
    }
    FinderService.getResults()
      .then((res: any) => {
        results = res.data;
        if(!!descriptions){
          ifDone();
        }
      })
    FinderService.getDescriptions()
      .then((res: any) => {
        descriptions = res.data;
        if(!!results){
          ifDone();
        }
      })
  }
}
</script>