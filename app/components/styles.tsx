import styledImport from 'styled-components';
import {
  NavLink,
  Form
} from '@remix-run/react';


const styled = (styledImport as any).default || styledImport;


interface StyleProps {
  $completed: boolean;
  $isMain: boolean;
}

// Layout and wrappers 

export const Card = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  background: #ffffff10;
  backdrop-filter: blur(2px);
`;

export const List = styled.li<StyleProps>`
  border-bottom: ${(props: StyleProps) => props.$isMain ? '2px solid #e5e7eb' : undefined};
`;

export const Row = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin: 1.5rem;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

export const FormCol = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InlineForm = styled.details`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    list-style: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  &[open] > form {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  form {
    display: none;
  }
`;

export const OutletContainer = styled.main`
  max-width: 860px;
  margin: 2rem auto; 
  padding: 0 1rem;
`;

export const Link = styled(NavLink)`
padding: 1rem; 
color: white;
 text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex; 
  gap: 1rem; 
  align-items: center;
`;

export const Separator = styled.div`
  width: 100%;
  height: 8px;
  background: linear-gradient(
    90deg,
    #60a5fa,
    #3b82f6,
    #60a5fa
  );
  margin: 1.5rem 0;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); 
`;

// Buttons 
export const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: .5rem .8rem;
  cursor: pointer;
  background-color: #014a8c;
  color: #eef2ff;

   &:hover {
    opacity: 0.6;
  }
`;

export const OpenSubTasksButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: .5rem .8rem;
  cursor: pointer;
  background-color: #014a8c;
  color: #eef2ff;

   &:hover {
    opacity: 0.6;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: .4rem .6rem;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

   svg {
    color: red;   
    width: 1rem; 
    height: 1rem;
  }

  &:hover svg {
    opacity: 0.6;
  }
`;

export const StatusButton = styled.button<StyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid ${(props: StyleProps) => (props.$completed ? '#4CAF50' : '#ccc')};
  background-color: ${(props: StyleProps) => (props.$completed ? '#4CAF50' : 'transparent')};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.6;
  }
`;

export const LogOutButton = styled.button`
   padding: 0.8rem;
  background: #f3f4f6;
  color: #004b8c;
  font-size: 15px;
  font-weight: 700;
  border-radius: 10px;

   &:hover {
    opacity: 0.6;
  }
`;

export const Badge = styled.span`
  font-size: .75rem;
  padding: .5rem .5rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #014a8c;

   &:hover {
    opacity: 0.6;
  }
`;


// Inputs 
export const TextInput = styled.input.attrs({ type: 'text' })``;
export const EmailInput = styled.input.attrs({ type: 'email' })``;
export const PasswordInput = styled.input.attrs({ type: 'password' })``;



// Label and Texts
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 0.9rem;
  color: #111827;

  input {
    margin-top: 0.25rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    width: 100%;
  }
`;

export const Header = styled.header`
padding: 1rem;
 display: flex;
 justify-content: space-between;
 align-items: center;
`;

export const Title = styled.span<StyleProps>`
  color: ${(props: StyleProps) => props.$completed ? '#b7ebb9' : 'inherit'};
  text-decoration: ${(props: StyleProps) => props.$completed ? 'line-through' : 'none'};
`;


export const Text = styled.p`
  margin: 1.5rem 0;
  color: #f3f4f6;
  font-size: 0.95rem;
`;

export const ErrorText = styled.small`
  color: #dcc726;
  font-size: 0.75rem;
`;

export const MutedText = styled.small`
  color: #f3f4f6;
  font-size: 0.85rem;

  a {
   margin-left: 0.6rem;
    color: #edededff;
    text-decoration: underline;
  }
`;




