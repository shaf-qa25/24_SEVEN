// 1. Pehle polyfill imports
import { Buffer } from 'buffer';
import process from 'process';
import EventEmitter from 'events';
import util from 'util';

// 2. Turant window par assign karo (React imports se pehle!)
window.global = window;
window.process = process;
window.Buffer = Buffer;
window.EventEmitter = EventEmitter;
window.util = util;

// 3. Ab baaki imports karo
import React from 'react';
import ReactDOM from "react-dom/client";
import { ContextProvider } from './SocketContext';
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);