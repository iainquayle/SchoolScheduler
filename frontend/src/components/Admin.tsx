import { createSignal, Setter, For } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { Routes, standardPost } from "./Routes";
import { userid, password } from './Authentication';

import "./Admin.css";

//TODO:
//  - add admin
//  - add school
//  - add class
//  - equate assessments

//consider making a quick column that lists schools and courses
enum AdminModals {
  ADD_SCHOOL = "add-school",
  ADD_CLASS = "add-class",
  PROMOTE_ADMIN = "promote-admin",
}
const ADD_SCHOOL_FORM = "add-school-form";

interface AdminProps {
  setAccessAdmin: Setter<boolean>
}


const [schools, setSchools] = createSignal([]);
async function getSchools() {
  try {
    const response = await (standardPost(Routes.Server + Routes.Data + Routes.Schools,
      { userid: userid(), password: password() }));
    if (response.ok) {
      const json = await response.json();
      setSchools(json.schools);
    } 
  } catch (error) { console.log(error); }
}

export default function Admin( props: AdminProps ) {
  //const [classes, setClasses] = createSignal();

  return (
    <>
      <div class="admin">
        <div class="admin-column">
          <div class="admin-element" onclick={() => {setActiveModal(AdminModals.ADD_SCHOOL);}}>Add School</div>
          <div class="admin-element">Add Class</div>
          <div class="admin-element">Promote to Admin</div>
          <div class="admin-element" onclick={() => {getSchools()}}>Refresh</div>
          <div class="admin-element" onclick={() => {props.setAccessAdmin(false)}}>Back</div>
        </div>
        <div class="admin-column">
          <For each={schools()}>
            {(school) => (
              <div class="admin-element">{school.SchoolName}</div>
            )}
          </For>
        </div>
        <div class="admin-column">
        </div>
      </div>
      <Modal title={"Add School"} modalType={AdminModals.ADD_SCHOOL}>
        <form id={ADD_SCHOOL_FORM}>
          <label for="schoolname">School Name</label>
          <input type="text" id="schoolname" name="schoolname" />
          <label for="schoolabbreviation">School Abbreviation</label>
          <input type="text" id="schoolabbreviation" name="schoolabbreviation" />
          <input type="button" value="Add" onclick={async () => {
            const form = document.getElementById(ADD_SCHOOL_FORM) as HTMLFormElement;
            if (form != null) {
              try {
                const response = await (standardPost(Routes.Server + Routes.Admin + Routes.AddSchool, 
                  { userid: userid(), password: password(), schoolname: form.schoolname.value, schoolabbreviation: form.schoolabbreviation.value} ));
                if (response.ok) {
                  const json = await response.json();
                  setActiveModal(NO_MODAL);
                } 
              } catch (error) { console.log(error); }
            }
          }}/>
        </form>
      </Modal>
    </>
  )
}
