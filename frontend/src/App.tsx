import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";
import Admin from "./components/Admin";
import { userid, NULL_ID } from "./components/Authentication"


export default function App() {
  const [accessAdmin, setAccessAdmin] = createSignal(false);

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Landing />
        </Match>
        <Match when={userid() !== NULL_ID && !accessAdmin()}>
          <Schedule />          
        </Match>
        <Match when={userid() !== NULL_ID && accessAdmin()}>
          <Admin />
        </Match>
      </Switch>
    </>
  );
}
