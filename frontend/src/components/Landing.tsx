// Home.tsx
import { createSignal, Show } from "solid-js";
import {Modal, setActiveModal} from "./Modal";
import { Routes, standardPost } from "./Routes";
import { setUserid, setPassword } from "./Authentication";

import "./Landing.css";

enum ModalType {
  LOGIN = "login",
  REGISTRATION = "registration",
}

const LOGIN_FORM = "login-form";
const REGISTRATION_FORM = "registration-form";


export default function Landing( ) {
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
            <input type="button" onclick={async () => {
              const form = document.getElementById(LOGIN_FORM) as HTMLFormElement;
              //fetch login, if successful, set userid and password, else set failedLogin
              console.log("clicked")
              if (form != null) {
                try {
                  const response = await (standardPost(Routes.Server + Routes.Test + Routes.Login, 
                    { userHandle: form.userHandle.value, password: form.password.value } ));
                  if (response.ok) {
                    const json = await response.json();
                    if (json.userid != null) {
                      setUserid(json.userid);
                      setPassword(form.password.value);
                      return;
                    }  
                  } 
                } catch (error) {}
                setFailedLogin(true);
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
