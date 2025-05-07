import JSONSignUpModel from './JSONSignUpModel.js';
export default class UserModelFactory {
  static getUserModel() { return JSONSignUpModel; }
}
