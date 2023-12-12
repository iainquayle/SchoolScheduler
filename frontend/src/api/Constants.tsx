// may move to this to make simple for standardizing constants between frontend and backend
// reason for being a class rather than enum is simplicity of copying to backend 
export const CONSTANTS = {
  null_id: -1,
  routes: {
    server: "http://localhost:8080",
    user: "/user",
    login: "/login",
    register: "/register",
    admin: "/admin",
    addSchool: "/add_school",
    promoteUser: "/promote_user",
    data: "/data",
    schools: "/schools",
  }
}
