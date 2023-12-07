// App.tsx
import { createSignal, Switch, Match } from 'solid-js';
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Home from "./components/Home";
import Modal from "./components/Modal"; // Make sure to import your Modal component

const NULL_ID = 0;

function App() {
  const [userid, setUserid] = createSignal(NULL_ID);
  const [password, setPassword] = createSignal('');
  const [loginModal, setLoginModal] = createSignal(false);
  const [registrationModal, setRegistrationModal] = createSignal(false);

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Home setUserid={setUserid} setPassword={setPassword} setRegistrationModal={setRegistrationModal} setLoginModal={setLoginModal} />
        </Match>
        <Match when={userid() !== NULL_ID}>
          <Schedule userid={userid} password={password} />          
        </Match>
      </Switch>

      {loginModal() && (
        <Modal onClose={() => setLoginModal(false)}>
          {/* Content of the login modal */}
          <Login setUserid={setUserid} setPassword={setPassword} />
        </Modal>
      )}

      {registrationModal() && (
        <Modal onClose={() => setRegistrationModal(false)}>
          {/* Content of the registration modal */}
          {/* You can create a new component for registration */}
          {/* For simplicity, I'm using the Login component. Adjust as needed */}
          <Login setUserid={setUserid} setPassword={setPassword} />
        </Modal>
      )}
    </>
  );
}

export default App;