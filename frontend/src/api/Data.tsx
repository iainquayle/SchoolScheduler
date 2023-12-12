import { postWithToken } from "./Util";
import { CONSTANTS } from "./Constants";

export async function fetchSchools(setSchoolList: any) {
  const response = await postWithToken(CONSTANTS.routes.data + CONSTANTS.routes.schools, { });
  const result = await response.json();
  //console.log(result);
  const data = await result.schools;
  setSchoolList(data);
}
