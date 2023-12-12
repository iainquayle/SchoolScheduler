import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";
import Admin from "./components/Admin";
import { userID } from "./api/Authentication"
import { CONSTANTS } from "./api/Constants";


export default function App() {
  const [adminPage, setAdminPage] = createSignal(false);

  return (
    <>
      <Switch>
        <Match when={userID() === CONSTANTS.null_id}>
          <Landing />
        </Match>
        <Match when={userID() !== CONSTANTS.null_id && !adminPage()}>
          <Schedule setAdminPage={setAdminPage} />          
        </Match>
        <Match when={userID() !== CONSTANTS.null_id && adminPage()}>
          <Admin setAccessAdmin={setAdminPage} />
        </Match>
      </Switch>
    </>
  );
}
