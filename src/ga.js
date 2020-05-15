import { cookiesAllowed } from './store.js';

const gtmProperty = 'GTM-THC2RPB';
const gtmTrackerName = 'gtmDefaultTracker'; // this name must be explicitly configured in the Tag Manager.
const disableStr = 'ga-disable';

if (document.cookie.indexOf(disableStr + '=true') > -1) {
  window[disableStr] = true;
  cookiesAllowed.set(false);
}

if (document.cookie.indexOf('_ga') > -1) {
  window['cookiesEnabled'] = true;
  cookiesAllowed.set(true);
}

function optout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
    cookiesAllowed.set(false);
}

function optin() {
  // <!-- Google Tag Manager -->
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', gtmProperty);
  // <!-- End Google Tag Manager -->

  cookiesAllowed.set(true);
}

cookiesAllowed.subscribe(allowed => {
  if(allowed)
    optin();
});

const sendGAEvent = (category, action, label) => {
  window.ga(gtmTrackerName + '.send', 'event', category, action, label);
}

export default {
  cookiesAllowed,
  optin,
  optout,
  sendGAEvent
}