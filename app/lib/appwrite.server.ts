import { Client, Databases, Users, Account, Query, Functions } from "node-appwrite";


// Regular client (no API key) -- login/signup

export function getClient(): Client {
  return new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!);
}

// Admin client (with API key) -- server-side operations

export function getAdminClient() {
  const client = getClient().setKey(process.env.APPWRITE_API_KEY!);

  return {
    client,
    databases: new Databases(client),
    users: new Users(client),
    account: new Account(client),
    functions: new Functions(client)

  };
}

export const dbIds = {
  databaseId: process.env.APPWRITE_DATABASE_ID!,
  tasksId: process.env.APPWRITE_COLLECTION_ID_TASKS!
};

export const Q = Query;
