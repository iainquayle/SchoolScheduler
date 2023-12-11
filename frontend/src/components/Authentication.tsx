import { createSignal } from "solid-js";


export const NULL_ID = 0;

export const [userid, setUserid] = createSignal(NULL_ID);
export const [password, setPassword] = createSignal("");
