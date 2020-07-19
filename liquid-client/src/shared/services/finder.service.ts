import QuestionRequestService from "./question-request.service";
import axios from "axios";

export class FinderService {
  static config: any[] = [];
  static values: any = {};

  public static loadStatusFromUrl() {
    this.config = QuestionRequestService.getQuestions();
    let queryParams = new URLSearchParams(window.location.search);
    this.values = {
      index: queryParams.get('index') == null ? 0 : parseInt("" + queryParams.get('index'))
    }
    this.config.forEach(element => {
      let v = queryParams.get(element.config.key);
      this.values[element.config.key] = v == null ? null : parseInt(v);
    });
  }
  public static parseValueToUrl(values = this.values): string {
    let params = []
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        if (values[key] != null) {
          params.push(key + '=' + values[key]);
        }
      }
    }
    if (params.length > 0) {
      return '?' + params.join('&')
    }
    return '';
  }
  public static getValue(key: string): any {
    return this.values[key];
  }
  public static allValuesExist() {
    let condition = true;
    FinderService.config.forEach( element => {
      let key = element.config.key;
      if(FinderService.values[key] == null || FinderService.values[key] == undefined){
        // TODO: früher abbrechen
        condition = false;
      }
    });
    return condition;
  }
  public static updateValue(key: string, value: any, doReload: boolean = true) {
    this.values[key] = value;
    if (doReload) window.history.replaceState(null, "", this.parseValueToUrl(this.values));
  }
  public static transformValues() {
    let tmpValues: any = {};
    try {
      this.config.forEach(config => {
        if (Object.prototype.hasOwnProperty.call(this.values, config.config.key)) {
          let value = this.values[config.config.key];
          let key = config.config.key;
          console.log(key, value);
          if (value == null || value == undefined) {
            //throw error
            throw new Error(value + ' ' + key);
          } else {
            if(!!config.config.transform){
              tmpValues[key] = config.config.transform(value);
            } else {
              tmpValues[key] = value;
            }
          }
        } else {
          // throw error
          throw new Error("");
        }
      });
    } catch (err) {
      return null;
    }
    return tmpValues;
  }
  public static getResults(): any {
    let tmpValues = this.transformValues();
    if (tmpValues != null) {
      return axios.get(location.origin + '/api/offers'+this.parseValueToUrl(tmpValues))
      // https://finder.wir-bleiben-liqui.de/api/offers?state=4&trade=8&age=2&sales=7500000&employees=3&totalAssets=15000000&lok=false

    } else {
      console.log('error');
      return null;
    }
  }
  public static getDescriptions(): any {
      return axios.get(location.origin + '/api/descriptions');
  }
}