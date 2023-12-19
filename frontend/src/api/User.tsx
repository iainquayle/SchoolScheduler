import {Setter} from "solid-js"
import {postToServer, postWithToken} from "./Util";
import {CONSTANTS} from "./Constants";
import {setUserID, setPassword, setIsAdmin, setSchoolID } from "./Authentication";

export async function fetchClasses(setClasses: Setter<any[]>) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.classes, {}));
    if (response.ok) {
      const json = await response.json();
      const classes = json.classes;
      setClasses(classes);
    } 
  } catch (error) { console.log(error); }
}

export async function addClass(schoolID: number, facultyCode: string, courseCode: number) {
  try {
    const response = await postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.addClass,
      {SchoolID: schoolID, FacultyCode: facultyCode, CourseCode: courseCode} );
    if (response.ok) {
      //const json = await response.json();
    }
  } catch (error) { console.log(error); }
}

export async function deleteClass(classID: number) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.deleteClass,
      { ClassID: classID} ));
    if (response.ok) {
      //const json = await response.json();
    }
  } catch (error) { console.log(error); }
}

export async function fetchTodos(setTodos: Setter<any[]>) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.todos, {}));
    if (response.ok) {
      const json = await response.json();
      const todos = json.todos;
      setTodos(todos);
    } 
  } catch (error) { console.log(error); }
}

export async function addTodo(name: string, dueDate: Date, description: string) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.addTodo,
      { TodoName: name, TodoDueDate: dueDate.toISOString().split('T')[0], TodoDescription: description} ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error); }
}

export async function deleteTodo(todoID: number) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.deleteTodo,
      { TodoID: todoID} ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error); }
}

export async function toggleTodo(todoID: number) {
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.toggleTodo,
      { TodoID: todoID} ));
    if (response.ok) {
      //const json = await response.json();
    } 
  } catch (error) { console.log(error); }
}

export async function login(userHandle: string, password: string ) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.login, 
      { UserHandle: userHandle, Password: password } ));
    if (response.ok) {
      const json = await response.json();
      if (json.UserID != null && json.UserID != CONSTANTS.null_id) {
        setUserID(json.UserID);
        setPassword(password);
        setIsAdmin(json.Admin);
        setSchoolID(json.SchoolID);
        return;
      }  
    } 
  } catch (error) { console.log(error);}
}

export async function followSchool(schoolName: string) { 
  try {
    const response = await (postWithToken(CONSTANTS.routes.user + CONSTANTS.routes.followSchool, 
      { SchoolName: schoolName } ));
    if (response.ok) {
      const json = await response.json();
      if(json.SchoolID != null && json.SchoolID != CONSTANTS.null_id) {
        setSchoolID(json.SchoolID);
        return;
      }
    } 
  } catch (error) { console.log(error);}
}

export async function register(username: string, password: string, email: string, school: string) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.register,
      { Username: username, Password: password, Email: email, SchoolName: school} ));
    if (response.ok) {
      const json = await response.json();
      if (json.UserID != null && json.UserID != CONSTANTS.null_id) {
        setUserID(json.UserID);
        setPassword(password);
        setSchoolID(json.SchoolID);
        return;
      }  
    } 
  } catch (error) { console.log(error); }
}
