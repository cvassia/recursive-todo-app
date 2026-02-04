# Recursive ToDo App

A cross-platform task management app that supports **unlimited nested tasks**, allowing users to organize complex projects with hierarchical workflows. Built with **TypeScript, Remix, and Appwrite**, it combines a recursive UI with full backend support for authentication, storage, and automated workflows.

[Live Demo](https://recursivetodoapp.cvassia.com/) • [GitHub](https://github.com/cvassia/recursive-todo-app)


![Recursive ToDo GIF](https://github.com/cvassia/recursive-todo-app/raw/main/assets/demo.gif)  


---

## Overview

Recursive ToDo App helps users structure tasks in deeply nested hierarchies rather than traditional flat lists. It is ideal for managing complex projects, personal productivity, or team workflows.

Users can create tasks, add subtasks recursively, mark them as complete, and organize projects effortlessly — all within a secure, scalable system.

---

## Role & Contribution

I built the entire application end-to-end, including:

- Recursive UI components for unlimited sub-task nesting  
- Integration with Appwrite for authentication, database, and serverless functions  
- Form validation using **Zod**  
- Automated workflows (welcome emails)  
- Unit testing for recursive logic with **Vitest**

---

## Architecture

- **Frontend:** Remix with TypeScript, typed API layer  
- **Recursive Component:** Dynamic tree rendering for tasks and subtasks  
- **Backend:** Appwrite for authentication, database, and serverless functions  
- **Form Validation:** Zod schemas for consistent and safe input  
- **Testing:** Vitest for core recursive algorithms  

---

## Features

- Unlimited sub-task nesting with dynamic tree rendering  
- Create, update, delete, and mark tasks as complete  
- Secure user registration and login  
- Form validation with Zod  
- Automated welcome emails using Appwrite Functions  
- Unit-tested recursive logic for reliability  

---

## Challenges & Solutions

- **Recursive Rendering:** Built efficient React components to handle deep nesting without performance issues  
- **Data Consistency:** Structured Appwrite database with hierarchical references for tasks  
- **Validation:** Implemented Zod schemas to ensure clean, predictable input  
- **Automated Workflows:** Configured serverless functions for seamless user onboarding  

---

## Key Learnings

- Advanced recursive component patterns in React and Remix  
- Full-stack integration with Appwrite services  
- Designing form validation pipelines with Zod  
- Writing unit tests for recursive algorithms  
- Structuring scalable, maintainable applications  

---

## Tech Stack

- **Frontend:** TypeScript, Remix  
- **Backend:** Node.js, Appwrite (Authentication, Database, Functions)  
- **Validation:** Zod  
- **Testing:** Vitest  

---

## Getting Started

```bash
git clone https://github.com/cvassia/recursive-todo-app.git
cd recursive-todo-app
npm install
npm run dev
Open http://localhost:3000 in your browser.

 ## Testing

   - Run "npm test" for unit tests.
   - Run "npm run test:ui" for UI/integration tests.






