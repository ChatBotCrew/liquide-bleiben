import { cookiesAllowed } from './store.js';

const gaProperty = 'UA-161472816-2';
const disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf(disableStr + '=true') > -1) { window[disableStr] = true; cookiesAllowed.set(false) };
if (document.cookie.indexOf('_ga') > -1) { window['cookiesEnabled'] = true; cookiesAllowed.set(true)};

function optout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
    cookiesAllowed.set(false);
}

function optin() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  cookiesAllowed.set(true);
  ga('create', gaProperty, 'auto');
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');
}

cookiesAllowed.subscribe(allowed => { if(allowed) optin() });

const sendGAEvent = (cat, act, lab) => { if (window.ga) window.ga('send', 'event', cat, act, lab); }

export default {
  cookiesAllowed,
  optin,
  optout,
  sendGAEvent
}