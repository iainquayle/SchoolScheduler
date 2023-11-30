import { createSignal } from 'solid-js'
import './App.css'

import Login from "./Components/Authentication/login"

function App() {
  const [userid, setUserid] = createSignal('')
  const [password, setPassword] = createSignal('')

  const handleSubmit = () => {
    console.log('User ID:', userid())
    console.log('Password:', password())
  }
  return (
    <>
      <Login setUserid={setUserid} setPassword={setPassword} onSubmit={undefined} />
    </>
  )
}

export default App
