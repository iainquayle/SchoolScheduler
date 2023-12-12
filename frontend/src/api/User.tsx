import {postToServer, postWithToken} from "./Util";
import {CONSTANTS} from "./Constants";
import {setUserID, setPassword, setIsAdmin} from "./Authentication";

export async function login(userHandle: string, password: string ) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.login, 
      { UserHandle: userHandle, Password: password } ));
    if (response.ok) {
      const json = await response.json();
      if (json.UserID != null && json.UserID != CONSTANTS.null_id) {
        setUserID(json.UserID);
        setPassword(password);
        setIsAdmin(json.Admin);
        return;
      }  
    } 
  } catch (error) { console.log(error);}
}

export async function followSchool(schoolName: string) { 
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.followSchool, 
      { SchoolName: schoolName } ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error);}
}

export async function register(username: string, password: string, email: string, school: string) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.register,
      { Username: username, Password: password, Email: email, SchoolName: school} ));
    if (response.ok) {
      const json = await response.json();
      if (json.UserID != null) {
        setUserID(json.UserID);
        setPassword(password);
        return;
      }  
    } 
  } catch (error) { console.log(error); }
}
