// Login.jsx
import { createSignal } from 'solid-js'

function Login({ setUserid, setPassword, onSubmit }) {
 const [userid, setUseridLocal] = createSignal('')
 const [password, setPasswordLocal] = createSignal('')

 const handleSubmit = (e) => {
    e.preventDefault()
    setUserid(userid())
    setPassword(password())
    onSubmit()
 }

 return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userid">User ID:</label>
      <input type="text" id="userid" value={userid()} onInput={(e) => setUseridLocal(e.target.value)} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password()} onInput={(e) => setPasswordLocal(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
 )
}

export default Login