import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData, useNavigation, Link } from '@remix-run/react';
import { z } from 'zod';

import { Client, Account } from 'appwrite';
import { getSession, commitSession } from '../sessions.server';
import { Card, Button, FormCol, Label, ErrorText, MutedText } from '../components/styles';

// Validation schema
const schema = z.object({
  email: z.string().email('Email must include \'@\' and be valid'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const email = String(form.get('email') || '');
  const password = String(form.get('password') || '');

  const parsed = schema.safeParse({ email, password });
  if (!parsed.success) {
    return json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!);

    const account = new Account(client);

    const session = await account.createEmailPasswordSession(email, password);

    const remixSession = await getSession(request.headers.get('Cookie'));
    remixSession.set('userId', session.userId);
    remixSession.set('email', email);

    return redirect('/', {
      headers: { 'Set-Cookie': await commitSession(remixSession) },
    });
  } catch (e: any) {
    return json({ errorMessage: e?.message || 'Login failed' }, { status: 400 });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const nav = useNavigation();
  const busy = nav.state !== 'idle';

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

        {actionData && 'errorMessage' in actionData && <ErrorText>{actionData.errorMessage}</ErrorText>}
        {actionData && 'error' in actionData && <ErrorText>{Object.values(actionData.error).flat().join(', ')}</ErrorText>}
        <Button disabled={busy}>{busy ? 'Signing in...' : 'Log in'}</Button>
      </FormCol>
      <p>
        <MutedText>
          New here? <Link to="/signup">Create an account</Link>
        </MutedText>
      </p>
    </Card>
  );
}
