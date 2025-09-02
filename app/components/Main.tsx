import {
    LiveReload,
    Outlet,
    Scripts,
    ScrollRestoration,
    NavLink
} from "@remix-run/react";
import {
    Header,
    Link,
    LogOutButton,
    Nav,
    OutletContainer,
} from "./styles";

type User = {
    id: string;
    email: string;
};

type MainProps = {
    user?: User | null;
};

export default function Main({ user }: MainProps) {
    return (
        <>
            <Header>
                <h1> Recursive To‑Do App</h1>
                <Nav>
                    {user ? (
                        <form method="post" action="/logout">
                            <LogOutButton>Log out</LogOutButton>
                        </form>
                    ) : (
                        <>
                            <Link to="/login">Log in</Link>
                            <Link to="/signup">Sign up</Link>
                        </>
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
