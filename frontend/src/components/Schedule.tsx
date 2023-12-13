import { createSignal, For, Show, Setter } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';
import { setUserID, setPassword, isAdmin } from "../api/Authentication";
import { CONSTANTS } from "../api/Constants";
import { followSchool, addTodo, fetchTodos, toggleTodo } from '../api/User';

import "./Schedule.css";
import "./Shared.css";

enum ScheduleModal {
  ADD_ASSESSMENT = "add-assessment",
  ADD_CLASS = "add-class",
  ADD_TODO = "add-todo",
  EDIT_CLASSES = "edit-classes",
  CHANGE_INSTITUTION = "change-institution",
  TODO = "todo",
}
const INSTITUTION_FORM = "institution-form";
const TODO_FORM = "todo-form";

interface ScheduleProps {
  setAdminPage: Setter<boolean>
}

export default function Schedule( props: ScheduleProps ) {
  //this will be needed for reactivity
  const [todos, setTodos] = createSignal<any[]>([]);

          //TODO: make bunch of modal components, will be chaos otherwise
  return (
    <>
      <div class="page" style="grid-template-columns: 1fr 2fr 2fr;">
        <div class="column sidebar">
          <Show when={isAdmin()}>
            <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); props.setAdminPage(true);}}>Access Admin Tools</div>
          </Show>
          <div class="column-element sidebar-element">Add Assessment</div>
          <div class="column-element sidebar-element">Add Class</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(ScheduleModal.ADD_TODO)}}>Add TODO</div>
          <div class="column-element sidebar-element">Edit Classes</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(ScheduleModal.CHANGE_INSTITUTION)}}>Change Institution</div>
          <div class="column-element sidebar-element" onclick={() => {fetchTodos(setTodos); console.log(todos().length)}}>Refresh</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); setPassword(""); setUserID(CONSTANTS.null_id)}} >Logout</div>
        </div>
        <div class="column list">
          <For each={todos()}>
            {(todo) => (
              <div class="column-element list-element" style="display: grid; grid-template-columns: 3fr 3fr 1fr;">
                <div class="list-element-title">{todo.TodoName}</div>
                <div class="list-element-due-date">{todo.TodoDueDate}</div>
                <input type="checkbox" checked={todo.TodoCompleted} onclick={async () => {
                  await toggleTodo(todo.TodoID);
                }}/>
              </div>
            )}
          </For>
        </div>
        <div class="column list">
        </div>
        <Modal title="Add TODO" modalType={ScheduleModal.ADD_TODO}>
          <form id={TODO_FORM}>
            <label for="todo">Title</label>
            <input type="text" name="todo"/>
            <label for="dueDate">Due Date</label>
            <input type="date" name="dueDate"/>
            <label for="description">Description</label>
            <input type="text" name="description"/>
            <input type="button" onclick={ async () => {
              const form = document.getElementById(TODO_FORM) as HTMLFormElement;
              console.log(form.dueDate.value);
              await addTodo( form.todo.value, new Date(form.dueDate.value), form.description.value);
              setActiveModal(NO_MODAL);
            }} value="Submit"/>
          </form>
        </Modal>
        <Modal title="Change Institution" modalType={ScheduleModal.CHANGE_INSTITUTION}>
          <form id={INSTITUTION_FORM}>
            <label for="school">Institution</label>
            <input type="text" name="school"/>
            <input type="button" onclick={ async () => {
              const form = document.getElementById(INSTITUTION_FORM) as HTMLFormElement;
              await followSchool(form.school.value);
              setActiveModal(NO_MODAL);
            }} value="Submit"/>
          </form>
        </Modal>
      </div>
    </>
  )
}

