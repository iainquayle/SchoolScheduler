import { createSignal, Switch, Match } from 'solid-js'
import './App.css'

import Login from "./pages/Login"
import Schedule from "./pages/Schedule"

const NULL_ID = 0

function App() {
  const [userid, setUserid] = createSignal(NULL_ID)
  const [password, setPassword] = createSignal('')

  enum Page {
    Login,
    Schedule,
  }

  return (
    <>
      <Switch>
        <Match when={userid() === NULL_ID}>
          <Login setUserid={setUserid} setPassword={setPassword} />
        </Match>
        <Match when={userid() !== NULL_ID}>
          <Schedule userid={userid} password={password} />          
        </Match>
      </Switch>
    </>
  )
}

export default App
