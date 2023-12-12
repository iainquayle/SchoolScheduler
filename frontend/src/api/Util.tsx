import { CONSTANTS } from "./Constants";

export async function postToServer(route: string, body: any): Promise<Response> {
  return await fetch(CONSTANTS.routes.server + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
