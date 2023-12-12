import { postWithToken } from "./Util";
import { CONSTANTS } from "./Constants";

export async function addSchool(schoolName: string, schoolAbbreviation: string) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.admin + CONSTANTS.routes.addSchool,
      {  SchoolName: schoolName, SchoolAbbreviation: schoolAbbreviation} ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error); }
}

export async function promoteUser(username: string) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.admin + CONSTANTS.routes.promoteUser,
      {  Username: username} ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error); }
}
