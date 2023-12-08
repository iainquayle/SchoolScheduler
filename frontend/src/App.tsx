// App.tsx
import { createSignal, Switch, Match } from 'solid-js';
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Home from "./components/Home";

const NULL_ID = 0;

function App() {
  const [userid, setUserid] = createSignal(NULL_ID);
  const [password, setPassword] = createSignal('');

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Home setUserid={setUserid} setPassword={setPassword}/>
        </Match>
        <Match when={userid() !== NULL_ID}>
          <Schedule userid={userid} password={password} />          
        </Match>
      </Switch>
    </>
  );
}

export default App;
