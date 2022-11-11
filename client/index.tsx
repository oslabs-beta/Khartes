import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from "./App"

// We are grabbing our element with the ID 'root' and making sure the element grabbed is not null
const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) throw new Error('Failed to get root element in index.ts');

// Creating root to be the type Root (from react) and made it the root element
const root: Root = createRoot(rootElement);

// The root we are rendering is App.jsx
root.render(<App />);
