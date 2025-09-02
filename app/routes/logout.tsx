import type { ActionFunctionArgs } from "@remix-run/node";

import { logout } from "../sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

export async function loader() {
  return new Response(null, { status: 404 });
}
