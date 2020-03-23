<script>
  import { send, receive } from './animations/crossfade.js';

  export let progress;
</script>

<progress value={progress} out:send="{{ duration: 500, key: 'progress' }}" in:receive="{{ duration: 500, key: 'progress' }}" max="7"></progress>

<style>
  progress {
    width: 90%;
    margin-top: 16px;

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
  }

  progress::-moz-progress-bar {
    background-color: #2CFFA2;
    border-radius: 50px;
  }
</style>