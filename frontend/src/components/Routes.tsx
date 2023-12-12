export enum Routes {
  Server = "http://localhost:8080",
  Test = "/test",
  User = "/user",
  Login = "/login",
  Register = "/register",
  Admin = "/admin",
  AddSchool = "/add_school",
}

export async function standardPost(url: string, body: any): Promise<Response> {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
