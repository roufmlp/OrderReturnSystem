import {ManageModelsProperties, SetState} from '../_helpers/global.functions';

export class GlobalModel {
  title: string = '';
  code: string = '';

  constructor(G: GlobalModel = null) {
    ManageModelsProperties(this, G, GlobalModel, []);
  }

  public static setState(name: string = 'Nationalities', object: GlobalModel[]): void {
    SetState({name, object});
  }

  public static getState(type: string = 'Nationalities', method: string = '', instance: any = null, cb: any = null, forceCB: boolean = false): GlobalModel[] {
    if (forceCB) {
      cb(type, method, instance);
      return [];
    }
    if (JSON.parse(localStorage.getItem(type)) != null) {
      const G: GlobalModel[] = JSON.parse(localStorage.getItem(type));
      if (G && G.length > 0) {
        for (let i = 0; i < G.length; i++) {
          G[i] = new GlobalModel(G[i]);
        }
      }
      return G;
    }
    if (cb) {
      cb(type, method, instance);
    }
    return [];
  }

  public static getStateBy(type: string = 'code', value: string = '', stateName: string = 'Nationalities'): GlobalModel {
    const G: GlobalModel[] = GlobalModel.getState(stateName);
    if (G && G.length > 0) {
      for (let i = 0; i < G.length; i++) {
        if (G[i][type] === value) {
          return new GlobalModel(G[i]);
        }
      }
    }
    return new GlobalModel();
  }

}
