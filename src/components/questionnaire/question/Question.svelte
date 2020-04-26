<script>
  import Input from './input/Input.svelte';
  import P from './p/P.svelte';
  import Select from './select/Select.svelte';

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
  {#if question.element.tag === "input"}
    <Input data={question}></Input>
  {/if}

  {#if question.text}
    <div class="help-text">{question.text}</div>
  {/if}
</div>