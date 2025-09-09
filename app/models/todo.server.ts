import { ID } from 'node-appwrite';
import { getAdminClient, dbIds, Q } from '../lib/appwrite.server';

export type TodoDoc = {
  $id: string;
  title: string;
  completed: boolean;
  parentId?: string | null;
  ownerId: string;
  createdAt: string;
};

export async function listTodosForOwner(ownerId: string) {
  const { databases } = getAdminClient();
  const res = await databases.listDocuments(dbIds.databaseId, dbIds.tasksId, [
    Q.equal('ownerId', ownerId),
    Q.orderAsc('$createdAt'),
    Q.limit(1000)
  ]);
  return res.documents as unknown as TodoDoc[];
}

export async function createTodo({ title, ownerId, parentId }: { title: string; ownerId: string; parentId?: string | null; }) {
  const { databases } = getAdminClient();
  const doc = await databases.createDocument(dbIds.databaseId, dbIds.tasksId, ID.unique(), {
    title,
    completed: false,
    parentId: parentId ?? null,
    ownerId
  });
  return doc as unknown as TodoDoc;
}

export async function toggleTodo({ id, completed }: { id: string; completed: boolean; }) {
  const { databases } = getAdminClient();
  await databases.updateDocument(dbIds.databaseId, dbIds.tasksId, id, { completed });
}

export async function deleteTodo(id: string) {
  const { databases } = getAdminClient();
  await databases.deleteDocument(dbIds.databaseId, dbIds.tasksId, id);
}
