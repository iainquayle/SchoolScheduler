import { createSignal, For, Show, Setter } from 'solid-js'
import { Modal, setActiveModal, NO_MODAL } from "./Modal";
import { SlotData, SlotElement } from './Slot';
import { setUserID, setPassword, isAdmin, schoolID } from "../api/Authentication";
import { CONSTANTS } from "../api/Constants";
import { followSchool, addTodo, fetchTodos, toggleTodo, deleteTodo } from '../api/User';
import { fetchSchools } from '../api/Data';

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
  const [todos, setTodos] = createSignal<any[]>([]);
  const [classes, setClasses] = createSignal<any[]>([
    {ClassID: 1, SchoolID: 1, FacultyCode: 'CS', CourseCode: 471, ClassName: 'database management', ClassDescription: 'DB', ClassDays: 'MWF', ClassTime: '10:00', ClassLocation: 'st431'},
    {ClassID: 2, SchoolID: 1, FacultyCode: 'CS', CourseCode: 457, ClassName: 'OS fundamental', ClassDescription: 'OS', ClassDays: 'MWF', ClassTime: '11:00', ClassLocation: 'st430'},
    {ClassID: 3, SchoolID: 1, FacultyCode: 'CS', CourseCode: 433, ClassName: 'intro to ai', ClassDescription: 'AI', ClassDays: 'TTh', ClassTime: '12:00', ClassLocation: 'st400'},
    {ClassID: 4, SchoolID: 1, FacultyCode: 'SE', CourseCode: 300, ClassName: 'too much java', ClassDescription: 'SE', ClassDays: 'MW', ClassTime: '13:00', ClassLocation: 'st431'},
  ]);
  const [school, setSchool] = createSignal<any>([{SchoolName: "None"}]);

  fetchTodos(setTodos);
  //fetchSchools(setSchool);

  return (
    <>
      <div class="page" style="grid-template-columns: 1fr 2fr 2fr;">
        <div class="column sidebar">
          <Show when={isAdmin()}>
            <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); props.setAdminPage(true);}}>Access Admin Tools</div>
          </Show>
          <div class="column-element sidebar-element">Add Assessment</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(ScheduleModal.ADD_TODO)}}>Add TODO</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(ScheduleModal.ADD_CLASS)}}>Add Class</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(ScheduleModal.CHANGE_INSTITUTION)}}>
            School: { school()[0].SchoolName }
          </div>
          <div class="column-element sidebar-element" onclick={() => {fetchTodos(setTodos); fetchSchools(setSchool, schoolID())}}>Refresh</div>
          <div class="column-element sidebar-element" onclick={() => {setActiveModal(NO_MODAL); setPassword(""); setUserID(CONSTANTS.null_id)}} >Logout</div>
        </div>
        <div class="column list">
          <For each={todos()}>
            {(todo) => (
              <div class="column-element list-element" style="display: grid; grid-template-columns: 3fr 1fr 1fr;" onclick={() => {
                setActiveModal(ScheduleModal.TODO + todo.TodoID);
              }}>
                <div style="pointer-event: none;">{todo.TodoName}</div>
                <div style="pointer-event: none;">{todo.TodoDueDate.split('T')[0]}</div>
                <div style="pointer-event: none;">{todo.TodoCompleted ? "Done" : "Not Done"}</div>
                <Modal title={todo.TodoName} modalType={ScheduleModal.TODO + todo.TodoID}>
                  <div>{todo.TodoDescription}</div>
                  <div>Due: {todo.TodoDueDate}</div>
                  <input type="checkbox" checked={todo.TodoCompleted} onclick={async () => {
                    await toggleTodo(todo.TodoID);
                    fetchTodos(setTodos);
                  }}/>
                  <div onclick={
                    async () => {
                      await deleteTodo(todo.TodoID);
                      fetchTodos(setTodos);
                      setActiveModal(NO_MODAL);
                    }
                  }> Delete </div>
                </Modal>
              </div>
            )}
          </For>
        </div>
        <div class="column list">
          <For each={classes()}>
            {(userClass) => (
              <div class="column-element list-element" style="display: grid; grid-template-columns: 1fr 1fr 4fr 1fr 1fr;" onclick={() => {
                setActiveModal(ScheduleModal.EDIT_CLASSES + userClass.ClassID);
              }}>
                <div style="pointer-event: none;">{userClass.FacultyCode}</div>
                <div style="pointer-event: none;">{userClass.CourseCode}</div>
                <div style="pointer-event: none;">{userClass.ClassName}</div>
                <div style="pointer-event: none;">{userClass.ClassDays}</div>
                <div style="pointer-event: none;">{userClass.ClassTime}</div>
              </div>
            )}
          </For>
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
              await fetchTodos(setTodos);
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
              //await fetchSchools(setSchool, schoolID());
              setActiveModal(NO_MODAL);
            }} value="Submit"/>
          </form>
        </Modal>
      </div>
    </>
  )
}

