// Home.tsx
import { createSignal, Show } from "solid-js";
import {Modal, setActiveModal} from "./Modal";

interface LandingProps {
  setUserid: (value: any) => void;
  setPassword: (value: any) => void;
}

enum ModalType {
  LOGIN = "login",
  REGISTRATION = "registration",
}

const LOGIN_FORM = "login-form";


export default function Landing(props: LandingProps) {
  const [userNameOrEmail, setUserNameOrEmail] = createSignal("");
  const [failedLogin, setFailedLogin] = createSignal(false);

  //cant get this.form to work for some reason, so will just do this. too bad
  //perhaps just inline all of this stuff??
  function login(): void {
    const form = document.getElementById(LOGIN_FORM);
    if (form !== null) 
      alert(form.username.value);
  }
  const register = (form): void => {
  }

  return (
    <div>
      <h1>School Scheduler</h1>
      <button onClick={() => {setFailedLogin(false); setActiveModal(ModalType.REGISTRATION)}}>Register</button>
      <button onClick={() => {setFailedLogin(false); setActiveModal(ModalType.LOGIN)}}>Login</button>
      <Modal title="Login" modalType={ModalType.LOGIN}> 
        <Show when={failedLogin()}>
          <div>Invalid username or password</div>
        </Show>
        <form name="login-form" id={LOGIN_FORM}>
          <div>
            <label for="username">Username or Email</label>
            <input type="text" name="username" value={userNameOrEmail()} />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="button" onclick={login} value="Sign-in"/>
          </div>
        </form>
      </Modal>
      <Modal title="Register" modalType={ModalType.REGISTRATION}>
        <Show when={failedLogin()}>
          <div>Email or username taken, or password invalid</div>
        </Show>
        <form name="registration-form">
          <div>
            <label for="username">Username</label>
            <input type="text" name="username" value="test"/>
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
            <input type="button" onclick={(form) => {}} value="Sign-in"/>
          </div>
        </form>
      </Modal>
    </div>
  );
}
