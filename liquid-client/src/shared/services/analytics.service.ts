// cookiesAllowed.subscribe(allowed => {
//   if (allowed)
//     optin();
// });

// export default {
//   cookiesAllowed,
//   optin,
//   optout,
//   sendGAEvent
// }

export default class AnalyticsService {
  private static gtmProperty = 'GTM-THC2RPB';
  private static gtmTrackerName = 'gtmDefaultTracker'; // this name must be explicitly configured in the Tag Manager.
  private static disableStr = 'ga-disable';

  public static allowed: any = null;

  public static init() {
  }

  public static allowAnalytics(allowd: boolean) {

  }

  public static sendGAEvent(category: any, action: any, label: any) {
    // let w: any = window;
    // if (get(cookiesAllowed)) window.ga(gtmTrackerName + '.send', 'event', category, action, label);
  }

  public static optin() {
    
    // <!-- Google Tag Manager -->
    
    // // <!-- End Google Tag Manager -->

    // cookiesAllowed.set(true);
  }
}