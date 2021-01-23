// Helpers
import {ManageModelsProperties, SetState} from '../_helpers/global.functions';

// Config

// Models

export class UserDetailsModel {
  ID?: string='';
  FirstName?: string = '';
  LastName?: string = '';
  MobileNo?: string = '';
  Username?: string = '';
  Password?: string = '';
  RoleID?: string='';
  Status?: string='';
  Eff_Start?: Date = new Date();
  Eff_End?: Date = new Date();
  DateCreated?: Date = new Date();
  CreatedBy?: Number=0;

  constructor(PD: UserDetailsModel = null) {
    if (PD) {
      
    }
    ManageModelsProperties(this, PD, UserDetailsModel);    
  }

  public static setState(PD: UserDetailsModel = UserDetailsModel.getState()): void {
    PD = PD ? new UserDetailsModel(PD) : UserDetailsModel.getState();
    SetState({name: 'UserDetailsModel', object: PD});
  }

  public static getState(): UserDetailsModel {
    if (JSON.parse(localStorage.getItem('UserDetailsModel')) != null) {
      return new UserDetailsModel(JSON.parse(localStorage.getItem('UserDetailsModel')));
    }
    return new UserDetailsModel();
  }

}
