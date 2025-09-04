# Recursive To‑Do App (Remix + Appwrite)

A to‑do app where each task can have infinite nested sub‑tasks. Built with Remix (TypeScript) and Appwrite.

## Features

- signup - login: register/login with email/password, the new user's credentials stored in Appwrite.
- Using an Appwrite Function a welcome email is automatically send to the user upon successful registration.
- Recursive to‑do list component with add / add sub‑task / mark complete / delete.
- Form validation using Zod.
- Unit test for the tree builder using Vitest.


## Appwrite resources

   - Project: get "PROJECT_ID" and set endpoint.
   - Database: create "todo_db".
   - Collection: "tasks" with attributes:
      title (string, required)
      completed (boolean, default "false")
      parentId (string, default null if there are no subtasks)
      ownerId (string, required)



### CI/CD Plan Steps

1. **Checkout Code**
   - Pull the latest code from the Git repository : https://github.com/cvassia/recursive-todo-app.git.

2. **Install Dependencies**
   - Run "npm install" to install all required Node.js packages.

3. **Linting & Formatting**
   - Run ESLint to enforce code quality and best practices.
   - Run Prettier to auto-format code (optional).

4. **Run the App**
  - Run "npm run dev" to start the application in development mode.


5. **Testing**
   - Run "npm test" for unit tests.
   - Run "npm run test:ui" for UI/integration tests.

6. **Build**
   - Compile the Remix application using `npm run build`.

7. **Deployment**
   - Deploy the built application to a hosting platform (Vercel or Netlify).


## Tools / Platforms:
For this small Github-based project, Github Actions would be chosen because it is fully integrated with GitHub,requires low maintenance and is easy to configure.
GitHub Actions: Runs workflow file on every push or pull request, integrating all previous (from 2 to 7) CI/CD steps automatically.



