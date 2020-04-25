<script>
  import P from './P.svelte';
  import Select from './Select2.svelte';

  export let question = {};
</script>

<div>
  {#if question.title}
    {question.title}
  {/if}

  {#if question.element.tag === "p"}
    <P data={question}></P>
  {/if}
  {#if question.element.tag === "select"}
    <Select data={question}></Select>
  {/if}

  {#if question.text}
    <div class="help-text">{question.text}</div>
  {/if}
</div>