import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";
import { userid, NULL_ID } from "./components/Authentication"


export default function App() {

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Landing />
        </Match>
        <Match when={userid() !== NULL_ID}>
          <Schedule />          
        </Match>
      </Switch>
    </>
  );
}
