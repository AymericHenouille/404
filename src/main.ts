import App from './App.svelte';
import './assets/styles/app.css';

const element: HTMLElement | null = document.getElementById('app');

const app: App = new App({
  target: element ?? document.body,
});

export default app;
