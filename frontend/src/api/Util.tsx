import { CONSTANTS } from "./Constants";
import { getToken } from "./Authentication";


export async function postWithToken(route: string, body: any): Promise<Response> {
  return await fetch(CONSTANTS.routes.server + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: getToken(), body: body}),
  });
}
export async function postToServer(route: string, body: any): Promise<Response> {
  return await fetch(CONSTANTS.routes.server + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
