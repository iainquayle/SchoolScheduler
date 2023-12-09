// Home.tsx
import { createSignal } from "solid-js";
import {Modal, setActiveModal} from "./Modal";

interface LandingProps {
  setUserid: (value: any) => void;
  setPassword: (value: any) => void;
}

enum ModalType {
  LOGIN = "login",
  REGISTRATION = "registration",
}

function login(form): void {
}

export default function Landing(props: LandingProps) {
  const [userNameOrEmail, setUserNameOrEmail] = createSignal("");

  return (
    <div>
      <h1>School Scheduler</h1>
      <button onClick={() => setActiveModal(ModalType.REGISTRATION)}>Register</button>
      <button onClick={() => setActiveModal(ModalType.LOGIN)}>Login</button>
      <Modal title="Login" modalType={ModalType.LOGIN}> 
        <form name="login">
          <label for="username">Username or Email</label>
          <input type="text" name="username" value={userNameOrEmail()} />
          <label for="password">Password</label>
          <input type="password" name="password" />
        </form>
      </Modal>
      <Modal title="Register" modalType={ModalType.REGISTRATION}>
        <div/>
      </Modal>
    </div>
  );
}
