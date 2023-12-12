import { createSignal, Setter, For } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { userID, password } from '../api/Authentication';
import { addSchool, promoteUser } from '../api/Admin';
import { fetchSchools } from '../api/Data';

import "./Shared.css";

//consider making a quick column that lists schools and courses
enum AdminModals {
  ADD_SCHOOL = "add-school",
  ADD_CLASS = "add-class",
  PROMOTE_USER = "promote-user",
}
const ADD_SCHOOL_FORM = "add-school-form";
const PROMOTE_USER_FORM = "promote-user-form";

interface AdminProps {
  setAccessAdmin: Setter<boolean>
}


export default function Admin( props: AdminProps ) {
  const [schools, setSchools] = createSignal([]);
  //const [classes, setClasses] = createSignal();

  fetchSchools(setSchools);

  return (
    <>
      <div class="page" style="grid-template-columns: 1fr 1fr 1fr;">
        <div class="column sidebar">
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(AdminModals.ADD_SCHOOL);}}>Add School</div>
          <div class="column-element sidebar-element">Add Class</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(AdminModals.PROMOTE_USER)}}>Promote User</div>
          <div class="column-element sidebar-element" onclick={() => {fetchSchools(setSchools)}}>Refresh</div>
          <div class="column-element sidebar-element" onclick={() => {props.setAccessAdmin(false)}}>Back</div>
        </div>
        <div class="column list">
          <For each={schools()}>
            {(school) => (
              <div class="column-element list-element">{school.SchoolName}</div>
            )}
          </For>
        </div>
        <div class="column list">
        </div>
      </div>
      <Modal title={"Promote User"} modalType={AdminModals.PROMOTE_USER}>
        <form id={PROMOTE_USER_FORM}>
          <label for="username">User Handle</label>
          <input type="text" name="username" />
          <input type="button" value="Promote" onclick={async () => {
            const form = document.getElementById(PROMOTE_USER_FORM) as HTMLFormElement;
            await promoteUser(form.username.value);
            setActiveModal(NO_MODAL);
          }}/>
        </form>
      </Modal>
      <Modal title={"Add School"} modalType={AdminModals.ADD_SCHOOL}>
        <form id={ADD_SCHOOL_FORM}>
          <label for="schoolname">School Name</label>
          <input type="text" name="schoolname" />
          <label for="schoolabbreviation">School Abbreviation</label>
          <input type="text" name="schoolabbreviation" />
          <input type="button" value="Add" onclick={async () => {
            const form = document.getElementById(ADD_SCHOOL_FORM) as HTMLFormElement;
            await addSchool(form.schoolname.value, form.schoolabbreviation.value);
            setActiveModal(NO_MODAL);
          }}/>
        </form>
      </Modal>
    </>
  )
}
