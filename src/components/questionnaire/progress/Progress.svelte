<script>
  export let value;
  export let max;
</script>

<progress value={value} max={max}></progress>

<style>
  progress {
    width: 90%;
    max-width: 880px;
    margin-top: 16px;
    margin-bottom: 8px;
    margin-left: auto;
    margin-right: auto;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #2CFFA2;
  }

  progress::-webkit-progress-bar {
    background-color: #FFF;
    border: 1px solid #333;
    border-radius: 50px;
  }

  progress::-webkit-progress-value {
    background-color: #2CFFA2;
    border-radius: 50px;
    transition: width 1s;
  }

  progress::-moz-progress-bar {
    background-color: #2CFFA2;
    border-radius: 50px;
  }
</style>
