// Home.tsx
import { createSignal } from "solid-js";

interface HomeProps {
  setUserid: (value: any) => void;
  setPassword: (value: any) => void;
  setRegistrationModal: (value: boolean) => void;
  setLoginModal: (value: boolean) => void;
}

export default function Home(props: HomeProps) {
  const [userNameOrEmail, setUserNameOrEmail] = createSignal("");

  const openRegistrationModal = () => {
    props.setRegistrationModal(true);
  };

  return (
    <div>
      <h1>School Scheduler</h1>
      <button onClick={openRegistrationModal}>Register</button>
      <button onClick={() => props.setLoginModal(true)}>Login</button>
    </div>
  );
}
