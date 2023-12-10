// App.tsx
import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";
import { AuthenticationData } from "./components/Authentication"

const NULL_ID = 0;

export default function App() {
  const [userid, setUserid] = createSignal(1);
  const [password, setPassword] = createSignal('');

  const authData = new AuthenticationData(userid, password, setUserid, setPassword) 

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
