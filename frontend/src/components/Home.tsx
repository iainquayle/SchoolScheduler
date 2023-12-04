//landing page, could be renamed to that
//login and account creation will be done through a modal, no need for separate pages

import { createSignal } from "solid-js";

export default function Home(setUserid: any, setPassword: any) {
  const [userNameOrEmail, setUserNameOrEmail] = createSignal("");
  return (
    <div>
      <h1>add title</h1>
      <h1>add login and register buttons</h1>
      <h1>both buttons open a modal</h1>
    </div>
  );
}
