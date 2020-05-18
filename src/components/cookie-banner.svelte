<script>
  import ga from '../ga.js'
  import { cookiesAllowed, lastStep } from '../store.js';
  const optin = () => ga.optin();
  const optout = () => ga.optout();
</script>

<style>
  .cookies-banner {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    font-size: 0.75em;
    display: flex;
    padding: 16px 32px;
    box-sizing: border-box;
    align-items: center;
    background-color: #ffffffbb;
  }

  .cookies-banner > div {
    flex: 1;
  }

  .cookies-banner > button {
    margin: 0 8px;
  }

  .ga-optin {
    max-width: 300px;
    width: 30%;
  }

  .ga-optout {
    cursor: pointer;
  }
</style>

  <div class="cookies-banner">
    <div>
      <div>
        Diese Website verwendet Cookies – nähere Informationen dazu und zu Ihren
        Rechten als Benutzer finden Sie in unserer
        <a href="https://wir-bleiben-liqui.de/datenschutz/">
          Datenschutzerklärung
        </a>
        .
      </div>
      <div>
        Klicken Sie auf "Ich stimme zu", um Cookies zu akzeptieren und direkt
        unsere Website besuchen zu können.
      </div>
    </div>
    <button class="ga-optin" on:click={optin}>Ich stimme zu</button>
    <a on:click={optout} class="ga-optout">X</a>
  </div>

