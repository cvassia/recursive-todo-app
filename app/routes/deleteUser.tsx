import type { ActionFunctionArgs } from '@remix-run/node';
import { deleteUser } from '../sessions.server';

export async function action({ request }: ActionFunctionArgs) {
    return deleteUser(request);
}
