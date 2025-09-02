import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useNavigation, Link } from "@remix-run/react";
import { z } from "zod";

import { getAdminClient } from "../lib/appwrite.server";
import { getSession, commitSession } from "../sessions.server";
import { Account, ID } from "node-appwrite";

import {
  Card,
  Button,
  FormCol,
  Label,
  ErrorText,
  MutedText
} from "../components/styles";

// Validation schema
const schema = z.object({
  email: z.string().email("Email must include '@' and be valid"),
  password: z.string().min(6, "Password must be at least 8 characters"),
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
    const { users, functions } = getAdminClient();

    const account = new Account(users.client);

    const user = await account.create(ID.unique(), email, password);

    try {
      await functions.createExecution(
        "welcome-email",
        JSON.stringify({ email })
      );
    } catch (err) {
      console.warn("Failed to send welcome email:", err);
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("userId", user.$id);
    session.set("email", user.email);

    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  } catch (e: any) {
    return json({ errorMessage: e?.message || "Failed to sign up" }, { status: 400 });
  }
}

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const nav = useNavigation();
  const busy = nav.state !== "idle";

  return (
    <Card style={{ maxWidth: 480 }}>
      <h2>Create account</h2>
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
        <Button disabled={busy}>
          {busy ? "Creating..." : "Sign up"}
        </Button>
      </FormCol>
      <p>
        <MutedText>
          Already have an account? <Link to="/login">Log in</Link>
        </MutedText>
      </p>
    </Card>
  );
}
