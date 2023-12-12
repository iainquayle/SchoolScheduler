import { createSignal, Show } from "solid-js";
import { Modal, setActiveModal } from "./Modal";
import { userID, setPassword } from "../api/Authentication";
import { login, register } from "../api/User";
import { CONSTANTS } from "../api/Constants";

import "./Landing.css";

enum ModalType {
  LOGIN = "login",
  REGISTRATION = "registration",
}

const LOGIN_FORM = "login-form";
const REGISTRATION_FORM = "registration-form";


export default function Landing( ) {
  const [failedLogin, setFailedLogin] = createSignal(false);

  return (
    <div class="landing">
      <h1>School Scheduler</h1>
      <button onClick={() => {setFailedLogin(false); setActiveModal(ModalType.REGISTRATION)}}>Register</button>
      <button onClick={() => {setFailedLogin(false); setActiveModal(ModalType.LOGIN)}}>Login</button>
      <Modal title="Login" modalType={ModalType.LOGIN}> 
        <Show when={failedLogin()}>
          <div>Invalid username or password</div>
        </Show>
        <form name={LOGIN_FORM} id={LOGIN_FORM}>
          <label for="userHandle">Username or Email</label>
          <input type="text" name="userHandle"/>
          <label for="password">Password</label>
          <input type="password" name="password" />
          <input type="button" onclick={async () => {
            const form = document.getElementById(LOGIN_FORM) as HTMLFormElement;
            if (form != null) {
              await login(form.userHandle.value, form.password.value);
            }
            if (userID() == CONSTANTS.null_id) {
              setFailedLogin(true);
            }
          }} value="Sign-in"/>
        </form>
      </Modal>
      <Modal title="Register" modalType={ModalType.REGISTRATION}>
        <Show when={failedLogin()}>
          <div>Email or username taken, or password invalid</div>
        </Show>
        <form name={REGISTRATION_FORM} id={REGISTRATION_FORM}>
          <label for="username">Username</label>
          <input type="text" name="username"/>
          <label for="password">Password</label>
          <input type="password" name="password" />
          <label for="email">Email</label>
          <input type="email" name="email"/> 
          <label for="school">School(not used yet)</label>
          <input type="text" name="school"/> 
          <input type="button" onclick={async () => {
            const form = document.getElementById(REGISTRATION_FORM) as HTMLFormElement;
            if (form != null) {
              await register(form.username.value, form.password.value, form.email.value, form.school.value);
            }
            if (userID() == CONSTANTS.null_id) {
              setFailedLogin(true);
            }
          }} value="Register"/>
        </form>
      </Modal>
    </div>
  );
}
