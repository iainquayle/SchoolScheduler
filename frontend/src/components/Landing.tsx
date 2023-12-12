// Home.tsx
import { createSignal, Show } from "solid-js";
import {Modal, setActiveModal, NO_MODAL} from "./Modal";
import { Routes, standardPost } from "./Routes";
import { setUserid, setPassword, setIsAdmin, NULL_ID } from "./Authentication";

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
          <label for="userHandle">Username or Email</label>
          <input type="text" name="userHandle"/>
          <label for="password">Password</label>
          <input type="password" name="password" />
          <input type="button" onclick={async () => {
            const form = document.getElementById(LOGIN_FORM) as HTMLFormElement;
            if (form != null) {
              try {
                const response = await (standardPost(Routes.Server + Routes.User + Routes.Login, 
                  { userHandle: form.userHandle.value, password: form.password.value } ));
                if (response.ok) {
                  const json = await response.json();
                  if (json.userid != null && json.userid != NULL_ID) {
                    setUserid(json.userid);
                    setPassword(form.password.value);
                    setIsAdmin(json.admin);
                    return;
                  }  
                } 
              } catch (error) { console.log(error);}
            }
            setFailedLogin(true);
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
              try {
                const response = await (standardPost(Routes.Server + Routes.User + Routes.Register, 
                  { username: form.username.value, password: form.password.value, email: form.email.value, school: form.school.value} ));
                if (response.ok) {
                  const json = await response.json();
                  if (json.userid != null) {
                    setUserid(json.userid);
                    setPassword(form.password.value);
                    return;
                  }  
                } 
              } catch (error) { console.log(error); }
              setFailedLogin(true);
            }
          }} value="Register"/>
        </form>
      </Modal>
    </div>
  );
}
