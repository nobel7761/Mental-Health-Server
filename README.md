# Express TypeScript Prisma PostgreSQL Starter

This guide will walk you through the process of setting up a Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!

## Installation Steps

### Follow these steps to clone and set up starter project:

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/nobel7761/Starter-Express-TypeScript-Prisma-PostgreSQL.git
```

2. `Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd Starter-Express-TypeScript-Prisma-PostgreSQL
```

3. `Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
yarn install
```

### Creating the database schema

4. Migrate the database schema: Use the following command to create and apply the initial database schema:

```bash
npx prisma migrate dev --name init
```

This command creates a new migration file based on your schema changes and applies it to your database.

5. `Install Prisma Client:` Install the Prisma Client library by running the following command:

```bash
yarn add @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the Express TypeScript Prisma PostgreSQL Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

Happy coding!
