import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import {TodoList,Layout,Login,Registration} from "./pages";
import App from "./App";
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>

            <Routes>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/registration"  element={<Registration/>}/>
                <Route path="/" element={<Layout />}>
                    <Route path="todo-list" element={<TodoList />} ></Route>
                    <Route path="app" element={<App/>}></Route>
                </Route>
            </Routes>

        </AuthProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

