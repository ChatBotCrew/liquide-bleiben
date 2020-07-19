export class ButtonConfig {
  constructor(
    public name: string,
    public disabled: boolean = false,
    public listener: () => void
  ) { }

}
export class NavFooterService {
  private static listener: () => any;
  public static buttons: ButtonConfig[] = [];
  public static setChangeListener(listener: () => any) {
    this.listener = listener;
  }
  public static changeButtons(buttons: ButtonConfig[]) {
    this.buttons = buttons;
    if(!!this.listener) {
      this.listener();
    }
  }
}