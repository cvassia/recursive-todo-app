import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useActionData, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { Account } from "node-appwrite";

import { getClient } from "../lib/appwrite.server";
import { getSession, commitSession } from "../sessions.server";

import { Card, Button, FormCol, Label, ErrorText, MutedText } from "../components/styles";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const parsed = schema.safeParse({ email, password });

  if (!parsed.success) {
    return json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const client = getClient();
    const account = new Account(client);

    await account.createSession(email, password);

    const user = await account.get();

    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", user.$id);
    session.set("email", user.email);

    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (e: any) {
    return json({ errorMessage: e?.message || "Login failed" }, { status: 400 });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const nav = useNavigation();
  const busy = nav.state !== "idle";

  return (
    <Card style={{ maxWidth: 480 }}>
      <h2>Log in</h2>
      <FormCol method="post">
        <Label>
          Email
          <input name="email" type="email" required placeholder="you@example.com" />
        </Label>
        <Label>
          Password
          <input name="password" type="password" required placeholder="********" />
        </Label>

        {actionData && "error" in actionData && (
          <ErrorText>{Object.values(actionData.error).flat().join(", ")}</ErrorText>
        )}
        {actionData && "errorMessage" in actionData && (
          <ErrorText>{actionData.errorMessage}</ErrorText>
        )}

        <Button disabled={busy}>{busy ? "Signing in..." : "Log in"}</Button>
      </FormCol>

      <p>
        <MutedText>
          New here? <Link to="/signup">Create an account</Link>
        </MutedText>
      </p>
    </Card>
  );
}
