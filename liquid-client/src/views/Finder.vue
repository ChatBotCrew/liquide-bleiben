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
    <ActionFooter v-bind:buttons="buttons" v-on:event="action"></ActionFooter>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ActionFooter from "../components/ActionFooter/ActionFooter.vue";
import DynamicForm from "../components/DynamicForm.vue";
import Progress from "../components/Progress.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import QuestionRequestService from "../shared/services/question-request.service";
import { FinderService } from "../shared/services/finder.service";
import URLService from "../shared/services/url.service";

@Component({
  components: {
    ActionFooter,
    DynamicForm,
    Progress
  }
})
export default class Finder extends Vue {
  public currentQuestion = 0;
  public buttons: { name: string; disabled: boolean }[] = [
    { name: "Zurück", disabled: false },
    { name: "Weiter", disabled: true }
  ];
  public questions = QuestionRequestService.getQuestions();
  public status: any;
  public progressValues: any = {};

  mounted() {
    FinderService.loadStatusFromUrl();
    this.progressValues = FinderService.values;
    this.currentQuestion = FinderService.getValue("index");
  }

  public action(i: number) {
    let queryParams = new URLSearchParams(window.location.search);
    if (i == 0) {
      if (this.currentQuestion > 0) {
        FinderService.updateValue("index", --this.currentQuestion);
      } else {
        FinderService.updateValue("index", null, false);
        this.$router.push({
          path: "/start" + FinderService.parseValueToUrl()
        });
      }
    } else {
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
    }
    this.progressValues = FinderService.values;
  }
  getStatus(status: any) {
    this.status = status;

    if (status.isValid) {
      this.buttons[1].disabled = true;
    } else {
      this.buttons[1].disabled = false;
    }
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
  h2 {
    text-align: center;
  }
}
@media (min-width: 768px + 20px) {
}
</style>

