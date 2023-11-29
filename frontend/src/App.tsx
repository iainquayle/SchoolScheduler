import { createSignal } from 'solid-js'
import './App.css'

import Login from "./pages/login"

function App() {
  const [userid, setUserid] = createSignal('')
  const [password, setPassword] = createSignal('')
  return (
    <>
      <Login setUserid={setUserid} setPassword={setPassword} />
    </>
  )
}

export default App
