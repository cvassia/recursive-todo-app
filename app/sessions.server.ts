import { createCookieSessionStorage, redirect } from "@remix-run/node";

type DemoSessionData = { userId: string; email: string; };

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<DemoSessionData>({
  cookie: {
    name: "__demo_session",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "dev-secret"],
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  }
});

export async function getSessionUser(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const userId = session.get("userId");
  const email = session.get("email");
  if (userId && email) return { id: userId, email };
  return null;
}

export async function requireUser(request: Request) {
  const user = await getSessionUser(request);
  if (!user) throw redirect("/login");
  return user;
}

export async function createUserSession({ request, userId, email, redirectTo }: { request: Request; userId: string; email: string; redirectTo: string; }) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  session.set("userId", userId);
  session.set("email", email);
  return redirect(redirectTo, { headers: { "set-cookie": await commitSession(session) } });
}

export async function logout(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  return redirect("/login", { headers: { "set-cookie": await destroySession(session) } });
}
