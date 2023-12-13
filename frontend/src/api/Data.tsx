import { postWithToken } from "./Util";
import { CONSTANTS } from "./Constants";

export async function fetchSchools(setSchoolList: any, schoolID: number = CONSTANTS.null_id) {
  const response = await postWithToken(CONSTANTS.routes.data + CONSTANTS.routes.schools, { SchoolID: schoolID});
  const result = await response.json();
  const data = await result.schools;
  console.log(data);
  setSchoolList(data);
}
