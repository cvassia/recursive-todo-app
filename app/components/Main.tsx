import {
    LiveReload,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation
} from '@remix-run/react';

import {
    Header,
    Link,
    LogOutButton,
    DeleteUserButton,
    Nav,
    OutletContainer,
} from './styles';


type User = {
    id: string;
    email: string;
};

type MainProps = {
    user?: User | null;
};

export default function Main({ user }: MainProps) {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <>
            <Header>
                <h1> Recursive To‑Do App</h1>
                <Nav>
                    {user ? (
                        <>
                            <form method="post" action="/deleteUser">
                                <input type="hidden" name="userId" value={user.id} />
                                <DeleteUserButton>Delete User</DeleteUserButton>
                            </form>
                            <form method="post" action="/logout">
                                <LogOutButton>Log out</LogOutButton>
                            </form>
                        </>
                    ) : (pathname === '/login' ? <Link to="/signup">Sign up</Link> : pathname === '/login' ? <Link to="/login">Log in</Link> : null
                    )}
                </Nav>
            </Header>
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </>
    );
}
