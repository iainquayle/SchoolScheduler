import { createSignal } from 'solid-js'

//may want to split the login logic to a seperate module, put it under somehting like api
//also, could do the login through a modal rather than a page, will need a modal anyway for schedule editing
export default function Login(setUserid: any, setPassword: any) {
  const [username, setUsername] = createSignal('')

  return (
    <>
      <form>
        <label>Username or email</label><br />
        <input type="text" /><br />
        <label>Password</label><br />
        <input type="text" /><br />
        <input type="button" value="Sign In"/>
      </form>
    </>
  )
}
