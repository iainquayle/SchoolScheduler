export const SERVER_URL = "http://localhost:8080";

export const NULL_ID = 0;

export class AuthenticationData {
	id: any;
	password: any;
  setID: any;
  setPassword: any;
  constructor(id: any, password: any, setID: any, setPassword: any) {
    this.id = id;
    this.password = password;
    this.setID = setID;
    this.setPassword = setPassword;
  }
}
