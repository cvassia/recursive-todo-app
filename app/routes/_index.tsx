import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import React from 'react';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';

import { requireUser } from '../sessions.server';
import { listTodosForOwner, createTodo, toggleTodo, deleteTodo } from '../models/todo.server';
import { buildTree } from '../utils/tree';
import TodoTree from '../components/TodoTree';
import {
  Card,
  FlexCol,
  FormCol,
  Text,
  Button,
  Separator
} from '../components/styles';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const docs = await listTodosForOwner(user.id);
  const tree = buildTree(docs);
  return json({ user, tree });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const form = await request.formData();
  const _action = String(form.get('_action') || '');

  if (_action === 'add') {
    const title = String(form.get('title') || '').slice(0, 200);
    const parentId = form.get('parentId') ? String(form.get('parentId')) : null;
    if (!title) return redirect('/');
    await createTodo({ title, ownerId: user.id, parentId });
    return redirect('/');
  }

  if (_action === 'toggle') {
    const id = String(form.get('id') || '');
    const completed = String(form.get('completed') || 'false') === 'true';
    await toggleTodo({ id, completed });
    return redirect('/');
  }

  if (_action === 'delete') {
    const id = String(form.get('id') || '');
    await deleteTodo(id);
    return redirect('/');
  }

  return redirect('/');
}

export default function Index() {
  const { user, tree } = useLoaderData<typeof loader>();

  const [isClient, setIsClient] = React.useState(false);

  const $form = React.useRef<HTMLFormElement>(null);

  const navigation = useNavigation();

  React.useEffect(function resetFormOnSuccess() {
    if (navigation.state === 'idle') {
      $form.current?.reset();
    }
  }, [navigation.state]);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <h2>Hello, {user.email}</h2>
      <Text>Create tasks, then nest sub-tasks infinitely.</Text>
      <FormCol
        method="post"
        ref={$form}
      >
        <input type="hidden" name="_action" value="add" />
        <input
          name="title"
          type="text"
          placeholder="New task title"
          required
        />
        <Button>Add</Button>
      </FormCol>
      <Separator />
      <div>
        {!tree.length ? (
          <Text>No tasks yet — add your first one!</Text>
        ) : null}
        <FlexCol>
          {isClient && <TodoTree nodes={tree} />}
        </FlexCol>
      </div>
    </Card>
  );
}
