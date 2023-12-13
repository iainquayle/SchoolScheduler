import { createSignal } from "solid-js";
import { CONSTANTS } from "./Constants";

export function getToken() {
  return { UserID: userID(), Password: password() };
}

export const [userID, setUserID] = createSignal(CONSTANTS.null_id);
export const [password, setPassword] = createSignal("");
//admin purley for displaying options, does not affect backend
export const [isAdmin, setIsAdmin] = createSignal(false);
//schoolID is used for displaying school specific data, really shouldnt be here, too bad
export const [schoolID, setSchoolID] = createSignal(CONSTANTS.null_id);
