import {Setter} from "solid-js"
import {postToServer, postWithToken} from "./Util";
import {CONSTANTS} from "./Constants";
import {setUserID, setPassword, setIsAdmin} from "./Authentication";

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
      //const json = await response.json();
    } 
  } catch (error) { console.log(error);}
}

export async function register(username: string, password: string, email: string, school: string) {
  try {
    const response = await (postToServer(CONSTANTS.routes.user + CONSTANTS.routes.register,
      { Username: username, Password: password, Email: email, SchoolName: school} ));
    if (response.ok) {
      const json = await response.json();
      if (json.UserID != null) {
        setUserID(json.UserID);
        setPassword(password);
        return;
      }  
    } 
  } catch (error) { console.log(error); }
}
