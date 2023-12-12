import { createSignal, Setter, For } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";

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
}
const ADD_SCHOOL_FORM = "add-school-form";

interface AdminProps {
  setAccessAdmin: Setter<boolean>
}

export default function Admin( props: AdminProps ) {
  const [schools, setSchools] = createSignal();
  const [classes, setClasses] = createSignal();

  return (
    <>
      <div class="admin">
        <div class="admin-column">
          <div class="admin-element" onclick={() => {setActiveModal(AdminModals.ADD_SCHOOL);}}>Add School</div>
          <div class="admin-element">Add Class</div>
          <div class="admin-element" onclick={() => {props.setAccessAdmin(false)}}>Back</div>
        </div>
        <div class="admin-column">
        </div>
        <div class="admin-column">
        </div>
      </div>
      <Modal title={"Add School"} modalType={AdminModals.ADD_SCHOOL}>
        <form id={ADD_SCHOOL_FORM}>
          <label for="school-name">School Name</label>
          <input type="text" id="school-name" name="school-name" />
          <label for="school-abbreviation">School Abbreviation</label>
          <input type="text" id="school-abbreviation" name="school-abbreviation" />
          <label for="school-website">School Website</label>
          <input type="text" id="school-website" name="school-website" />
          <input type="button" value="Submit" />
        </form>
      </Modal>
    </>
  )
}
