import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    min-height: 100vh;
    background: linear-gradient(
      180deg,
      #014a8c 0%,
      #025aa9 20%,
      #1e63bd 40%,
      #367ac9 60%,
      #4f91d6 80%
    );
    color: #fff;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; }

   ul { list-style: none;  }

   a { color: #014a8c; text-decoration: underline; }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: .5rem .75rem;
    width: 100%;
  }

  button {
    border: none;
    border-radius: 10px;
    padding: .5rem .8rem;
    cursor: pointer;
  }
`;


