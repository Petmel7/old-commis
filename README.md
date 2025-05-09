# Next.js Project with Node.js Backend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Node.js Backend

To set up the backend, follow these steps:

```bash
# Navigate to the backend directory
cd server

# Install dependencies
npm install

# Start the Node.js development server
npm run dev


2. Next.js Frontend
To set up the frontend, follow these steps:

bash
# Navigate to the frontend directory
cd commis-next

# Install dependencies
npm install

# Start the Next.js development server
npm run dev
Once both the Node.js backend and the Next.js frontend are running, open http://localhost:3000 in your browser to see the result.

Notes:
Ensure both servers are running in separate terminal windows or tabs.
The backend will run by default on http://localhost:5000 and the frontend on http://localhost:3000.
This project uses next/font to automatically optimize and load Inter, a custom Google Font.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - Learn about Next.js features and API.
Learn Next.js - An interactive Next.js tutorial.
You can check out the Next.js GitHub repository - Your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform, created by the team behind Next.js.

Check out the Next.js deployment documentation for more details.

Project Structure
The project is divided into two main parts:

Backend (Node.js): Located in the server directory. It handles API routes and database interaction.
Frontend (Next.js): Located in the commis-next directory. It handles the UI and client-side logic.
Additional Notes:
The backend is expected to run on http://localhost:5000 and provides the API endpoints for the frontend.
Make sure you have Node.js installed before running the above commands.
Development Workflow
Backend Development
The backend is a Node.js application, and you can modify the API routes or database logic inside the server folder.
Restart the backend server whenever you make changes.
Frontend Development
The frontend uses Next.js and is located in the commis-next folder.
It supports hot reloading, so changes to the code automatically refresh the page.
Running Both Servers Simultaneously
Start the backend server:

bash
cd server
npm run dev
In a separate terminal window or tab, start the frontend server:

bash
cd commis-next
npm run dev
Once both servers are running, the application will be accessible at http://localhost:3000, and API calls will be handled by the backend server running on http://localhost:5000.


