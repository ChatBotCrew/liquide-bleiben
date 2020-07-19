<template>
  <div class="home">
    <h1>{{$router.currentRoute.meta.title}}</h1>
    <article>
      <h2>
        <a href="wir-bleiben-liqui.de">wir-bleiben-liqui.de</a>
      </h2>
      <p>
        bietet weder Rechts- noch Steuerberatung an.
        Bei diesem Angebot handelt es sich lediglich um einen kostenfreien und unverbindlichen Informationszugang für alle,
        die aufgrund (drohender) Liquiditätsengpässe finanzielle Unterstützung benötigen.
        Die Plattform bietet diese Unterstützung nicht selbst an,
        hilft aber dabei, passende Angebote von Finanzinstituten einzugrenzen.
        Bei Fragen rechtlicher, steuerlicher oder finanzplanerischer Natur sollten Experten der jeweiligen Themenfelder
        oder die Finanzinstitute selbst konsultiert werden.
      </p>
    </article>
    <ActionFooter v-bind:buttons="buttons" v-on:event="action"></ActionFooter>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ActionFooter from "../components/ActionFooter/ActionFooter.vue";
import Progress from "../components/Progress.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { FinderService } from "../shared/services/finder.service";

@Component({
  components: {
    ActionFooter,
    Progress
  }
})
export default class Start extends Vue {
  public buttons: { name: string; disabled: boolean }[] = [
    { name: "Akzeptieren", disabled: false },
    { name: "Akzeptieren & Kriterien anpassen", disabled: false }
  ];
  public action(i: number) {
    if (i == 0) {
      FinderService.updateValue("index", null, false);
      this.$router.push({
        path: "/results" + FinderService.parseValueToUrl()
      });
    } else {
      FinderService.updateValue("index", 0, false);
      this.$router.push({
        path: "/finder" + FinderService.parseValueToUrl()
      });
    }
  }

  mounted() {
    FinderService.loadStatusFromUrl();
  }
}
</script>
<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
article {
  background-color: var(--brown);
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 32px;
  h2 {
    text-align: center;
  }
}
@media (min-width: 768px + 20px) {
  // .home {
  //   align-items: center;
  // }
  // article {
  //   p {
  //     margin: 0;
  //     font-size: 24px;
  //   }
  // }
}
</style>

