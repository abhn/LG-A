import ReactDOM from "react-dom";
import React from "react";
import Layout from './components/Layout';

// this will inline bootstrap in the index's <head>
import Bootstrap from "bootstrap/dist/css/bootstrap.css";

const app = document.getElementById("app");

ReactDOM.render(<Layout/>, app);
