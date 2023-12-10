// Home.tsx
import { createSignal, Show } from "solid-js";
import {Modal, setActiveModal} from "./Modal";

import "./Landing.css";

interface LandingProps {
  setUserid: (value: any) => void;
  setPassword: (value: any) => void;
}

enum ModalType {
  LOGIN = "login",
  REGISTRATION = "registration",
}

const LOGIN_FORM = "login-form";
const REGISTRATION_FORM = "registration-form";


export default function Landing(props: LandingProps) {
  const [userNameOrEmail, setUserNameOrEmail] = createSignal("");
  const [failedLogin, setFailedLogin] = createSignal(false);

  //cant get this.form to work for some reason, so will just do this. too bad
  //perhaps just inline all of this stuff??

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
          <div>
            <label for="userHandle">Username or Email</label>
            <input type="text" name="userHandle"/>
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="button" onclick={() => {
              const form = document.getElementById(LOGIN_FORM) as HTMLFormElement;
              //fetch login, if successful, set userid and password, else set failedLogin
              if (form != null) {
                const userHandle = form.userHandle.value as string;
              }
            }} value="Sign-in"/>
          </div>
        </form>
      </Modal>
      <Modal title="Register" modalType={ModalType.REGISTRATION}>
        <Show when={failedLogin()}>
          <div>Email or username taken, or password invalid</div>
        </Show>
        <form name={REGISTRATION_FORM} id={REGISTRATION_FORM}>
          <div>
            <label for="username">Username</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" name="email"/> 
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="button" onclick={() => {
              const form = document.getElementById(REGISTRATION_FORM) as HTMLFormElement;
              if (form != null) {
                const username = form.username.value as string;
              }
            }} value="Register"/>
          </div>
        </form>
      </Modal>
    </div>
  );
}
