import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";
import Admin from "./components/Admin";
import { userid, NULL_ID } from "./components/Authentication"


export default function App() {
  const [adminPage, setAdminPage] = createSignal(false);

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Landing />
        </Match>
        <Match when={userid() !== NULL_ID && !adminPage()}>
          <Schedule setAdminPage={setAdminPage} />          
        </Match>
        <Match when={userid() !== NULL_ID && adminPage()}>
          <Admin setAccessAdmin={setAdminPage} />
        </Match>
      </Switch>
    </>
  );
}
