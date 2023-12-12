import {postToServer} from "./Util";
import {CONSTANTS} from "./Constants";
import { userID, password } from "./Authentication";

export async function fetchSchools(setSchoolList: any) {
  const response = await postToServer(CONSTANTS.routes.data + CONSTANTS.routes.schools, {
    userID: userID(),
    password: password(),
  });
  const data = await response.json().schools;
  setSchoolList(data);
}
