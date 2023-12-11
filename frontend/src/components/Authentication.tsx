import { createSignal } from "solid-js";


export const NULL_ID = -1;

export const [userid, setUserid] = createSignal(NULL_ID);
export const [password, setPassword] = createSignal("");
//admin purley for displaying options, does not affect backend
export const [isAdmin, setIsAdmin] = createSignal(false);
