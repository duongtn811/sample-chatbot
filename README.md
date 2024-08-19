# Sample Chatbot

This project is a simple chatbot application built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/), integrated with the OpenAI API for dynamic conversation.

## Getting Started

To get started with the development server, follow these steps:

1. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open the Application:**

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the chatbot in action.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **Chat Interface:** Users can interact with a chatbot through a simple and intuitive chat panel.
- **Dynamic Responses:** The chatbot uses the OpenAI API to generate and stream responses in real-time.
- **Responsive Design:** The chat interface adjusts its layout based on the screen size, using Tailwind CSS for styling.

## Technologies Used

- **Next.js:** For server-side rendering and static site generation.
- **React:** For building the user interface components.
- **OpenAI API:** For generating responses from the chatbot.
- **Tailwind CSS:** For responsive and modern styling.

## Components

- **`Messages`:** Component to display the list of chat messages.
- **`ChatPanel`:** Component for the chat input and controls.
- **`EmptyScreen`:** Component displayed when there are no messages.
- **`ChatContext`:** Context provider for managing chat state.

## Hooks

- **`useScrollAnchor`:** Custom hook for handling scroll behavior and anchors in the chat.
- **`useStreamingMessage`:** Custom hook for managing streaming responses from the OpenAI API.

## Deploy on Vercel

This project is deployed in Vercel by default Vercel support
