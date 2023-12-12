import {postToServer} from "./Util";
import {CONSTANTS} from "./Constants";
import {setUserID, setPassword, setIsAdmin} from "./Authentication";

export async function login(userHandle: string, password: string ) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.login, 
      { userHandle: userHandle, password: password } ));
    if (response.ok) {
      const json = await response.json();
      if (json.userid != null && json.userid != CONSTANTS.null_id) {
        setUserID(json.userid);
        setPassword(password);
        setIsAdmin(json.admin);
        return;
      }  
    } 
  } catch (error) { console.log(error);}
}

export async function register(username: string, password: string, email: string, school: string) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.register,
      { username: username, password: password, email: email, school: school} ));
    if (response.ok) {
      const json = await response.json();
      if (json.userid != null) {
        setUserID(json.userid);
        setPassword(password);
        return;
      }  
    } 
  } catch (error) { console.log(error); }
}
