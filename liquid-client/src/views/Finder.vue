<template>
  <div class="finder">
    <h1>{{$router.currentRoute.meta.title}}</h1>
    <Progress v-bind:values="progressValues" />
    <transition :name="'direction'" v-for="(question, index) in questions" :key="index">
      <div v-if="index === currentQuestion">
        <article>
          <h2>{{question.title}}</h2>
          <DynamicForm v-bind:config="question.config" v-on:status="getStatus"></DynamicForm>
        </article>
        <article>
          <p v-html="question.description"></p>
        </article>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import {
  ButtonConfig
} from "../components/NavFooter/ButtonConfig.class";
import DynamicForm from "../components/DynamicForm.vue";
import Progress from "../components/Progress.vue";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import QuestionRequestService from "../shared/services/question-request.service";
import { FinderService } from "../shared/services/finder.service";
import URLService from "../shared/services/url.service";

@Component({
  components: {
    DynamicForm,
    Progress
  }
})
export default class Finder extends Vue {
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig("Zurück", false, () => {
      this.previous();
    }),
    new ButtonConfig("Weiter", false, () => {
      this.next();
    })
  ];
  public currentQuestion = 0;
  public questions = QuestionRequestService.getQuestions();
  public status: any;
  public progressValues: any = {};

  @Emit("updateStatus")
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    this.progressValues = FinderService.values;
    this.currentQuestion = FinderService.getValue("index");
    this.updateStatus();
  }

  public previous() {
    if (this.currentQuestion > 0) {
      FinderService.updateValue("index", --this.currentQuestion);
    } else {
      FinderService.updateValue("index", null, false);
      this.$router.push({
        path: "/" + FinderService.parseValueToUrl()
      });
    }
    this.progressValues = FinderService.values;
  }
  public next() {
    let key = this.questions[this.currentQuestion].config.key;
    if (this.currentQuestion < this.questions.length) {
      FinderService.updateValue(key, this.status.value, false);
      if (this.currentQuestion < this.questions.length - 1) {
        FinderService.updateValue("index", ++this.currentQuestion);
      } else {
        FinderService.updateValue("index", null, false);
        this.$router.push({
          path: "/results" + FinderService.parseValueToUrl()
        });
      }
    }
    this.progressValues = FinderService.values;
  }

  getStatus(status: any) {
    this.status = status;

    if (status.isValid) {
      this.buttonsConfig[1].disabled = true;
    } else {
      this.buttonsConfig[1].disabled = false;
    }
    this.updateStatus();
  }
}
</script>
<style lang="scss">
.finder {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
article {
  background-color: var(--brown);
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 32px;
}
@media (min-width: 768px + 20px) {
}
</style>

