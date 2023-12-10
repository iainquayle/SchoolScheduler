// App.tsx
import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";

const NULL_ID = 0;

export default function App() {
  const [userid, setUserid] = createSignal(NULL_ID);
  const [password, setPassword] = createSignal('');

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Landing setUserid={setUserid} setPassword={setPassword}/>
        </Match>
        <Match when={userid() !== NULL_ID}>
          <Schedule userid={userid} password={password} />          
        </Match>
      </Switch>
    </>
  );
}
