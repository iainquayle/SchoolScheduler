import {postToServer} from "./Util";
import {CONSTANTS} from "./Constants";
import { userID, password } from "./Authentication";

export async function addSchool(schoolName: string) {
  try {
    const response = await (postToServer(CONSTANTS.routes.admin + CONSTANTS.routes.addSchool,
      { userid: userID(), password: password(), schoolname: schoolName, schoolabbreviation: ""} ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error); }
}
