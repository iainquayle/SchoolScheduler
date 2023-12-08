// Home.tsx
import { createSignal } from "solid-js";
import {Modal, setActiveModal} from "./Modal";

interface HomeProps {
  setUserid: (value: any) => void;
  setPassword: (value: any) => void;
}

enum ModalType {
  LOGIN = "login",
  REGISTRATION = "registration",
}

export default function Home(props: HomeProps) {
  const [userNameOrEmail, setUserNameOrEmail] = createSignal("");

  return (
    <div>
      <h1>School Scheduler</h1>
      <button onClick={() => setActiveModal(ModalType.REGISTRATION)}>Register</button>
      <button onClick={() => setActiveModal(ModalType.LOGIN)}>Login</button>
      <Modal title="Login" modalType={ModalType.LOGIN}> 
        <div>
          <label for="username">Username or Email</label>
          <input type="text" id="username" name="username" value={userNameOrEmail()} onInput={(e) => setUserNameOrEmail(e.currentTarget.value)} />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
      </Modal>
      <Modal title="Register" modalType={ModalType.REGISTRATION}>
        <div/>
      </Modal>
    </div>
  );
}
