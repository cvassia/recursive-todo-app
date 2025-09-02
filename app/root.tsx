import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  useLoaderData
} from "@remix-run/react";

import { getSessionUser } from "./sessions.server";
import Main from "./components/Main";
import { GlobalStyles } from "./GlobalStyles";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getSessionUser(request);
  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalStyles />
        <Main user={user} />
      </body>
    </html>
  );
}
