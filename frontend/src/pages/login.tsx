import { createSignal } from 'solid-js'

//may want to split the login logic to a seperate module, put it under somehting like api
export default function Login(setUserid: any, setPassword: any) {
  const [username, setUsername] = createSignal('')

  return (
    <>
      <form>
        <input type="text" />
        <input type="text" />
        <button type="submit">Sign In</button>
      </form>
    </>
  )
}
