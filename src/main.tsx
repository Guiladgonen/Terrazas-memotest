import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent right click
document.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
