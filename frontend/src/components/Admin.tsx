import { Setter } from 'solid-js'

//TODO:
//  - add admin
//  - add school
//  - add class
//  - equate assessments

//consider making a quick column that lists schools and courses

interface AdminProps {
  setAccessAdmin: Setter<boolean>
}

export default function Admin( props: AdminProps ) {
  return (
    <div>
      <h1>Admin</h1>
    </div>
  )
}
