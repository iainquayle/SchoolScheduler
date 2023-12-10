// App.tsx
import { createSignal, Switch, Match } from 'solid-js';
import Schedule from "./components/Schedule";
import Landing from "./components/Landing";
import { AuthenticationData, NULL_ID } from "./components/Authentication"


export default function App() {
  const [userid, setUserid] = createSignal(1);
  const [password, setPassword] = createSignal('');

  const authData = new AuthenticationData(userid, password, setUserid, setPassword) 

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Landing authData={authData}/>
        </Match>
        <Match when={userid() !== NULL_ID}>
          <Schedule authData={authData}/>          
        </Match>
      </Switch>
    </>
  );
}
