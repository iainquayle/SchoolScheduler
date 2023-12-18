import { createSignal, Setter, For } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
//import { userID, password } from '../api/Authentication';
import { addSchool, promoteUser, addClass } from '../api/Admin';
import { fetchSchools } from '../api/Data';

import "./Shared.css";

//consider making a quick column that lists schools and courses
enum AdminModals {
  ADD_SCHOOL = "add-school",
  ADD_CLASS = "add-class",
  PROMOTE_USER = "promote-user",
}
const ADD_SCHOOL_FORM = "add-school-form";
const ADD_CLASS_FORM = "add-class-form";
const PROMOTE_USER_FORM = "promote-user-form";

interface AdminProps {
  setAccessAdmin: Setter<boolean>
}


export default function Admin( props: AdminProps ) {
  const [schools, setSchools] = createSignal([]);
  const [classes, setClasses] = createSignal();

  fetchSchools(setSchools);

  return (
    <>
      <div class="page" style="grid-template-columns: 1fr 2fr 2fr;">
        <div class="column sidebar">
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(AdminModals.ADD_SCHOOL);}}>Add School</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(AdminModals.ADD_CLASS)}}>Add Class</div>
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
      <Modal title={"Add Class"} modalType={AdminModals.ADD_CLASS}>
        <form id={ADD_CLASS_FORM}>
          <label for="schoolname">School Name</label>
          <input type="text" name="schoolname" />
          <label for="facultycode">Faculty Code</label>
          <input type="text" name="facultycode" />
          <label for="coursecode">Course Code</label>
          <input type="text" name="coursecode" />
          <label for="classname">Class Name</label>
          <input type="text" name="classname" />
          <label for="monday">Monday</label>
          <input type="checkbox" name="monday" />
          <label for="tuesday">Tuesday</label>
          <input type="checkbox" name="tuesday" />
          <label for="wednesday">Wednesday</label>
          <input type="checkbox" name="wednesday" />
          <label for="thursday">Thursday</label>
          <input type="checkbox" name="thursday" />
          <label for="friday">Friday</label>
          <input type="checkbox" name="friday" />
          <label for="classtime">Class Time</label>
          <input type="text" name="classtime" />
          <label for="classlocation">Class Location</label>
          <input type="text" name="classlocation" />
          <label for="description">Description</label>
          <input type="text" name="description" />
          <input type="button" value="Add" onclick={async () => {
            console.log("adding class");
            const form = document.getElementById(ADD_CLASS_FORM) as HTMLFormElement;
            const days = 
              (form.monday.checked ? "M " : "") +
              (form.tuesday.checked ? "T " : "") +
              (form.wednesday.checked ? "W " : "") +
              (form.thursday.checked ? "Th " : "") +
              (form.friday.checked ? "F" : "");
            await addClass(form.schoolname.value, form.facultycode.value, form.coursecode.value, days, form.description.value, days, form.classtime.value, form.classlocation.value);
            setActiveModal(NO_MODAL);
          }}/>
        </form>
      </Modal>
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
