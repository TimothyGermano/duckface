import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import QuackFeed from "./QuackFeed";
import NewQuackForm from "./NewQuackForm";
import LoginForm from "./LoginForm";
import RequireAuth from "./RequireAuth";
import { AuthProvider } from "./hooks/AuthContext";
function App() {
  const [quacks, setQuacks] = useState([]);
  useEffect(() => {
    const fetchQuacks = async function () {
      const response = await fetch("http://localhost:5050/api/quacks");
      const data = await response.json();
      setQuacks(data);
    };
    fetchQuacks();
  }, []);

  const addQuack = async function (newQuack) {
    const response = await fetch("http://localhost:5050/api/quacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuack),
    });
    setQuacks([...quacks, newQuack]);
  };

  return (
    <AuthProvider>
      <Router>
        <>
          <Header />
          <div className="row">
            <div className="col-md-8">
              <QuackFeed quacks={quacks} />
            </div>
            <div className="col-md-4">
              <NewQuackForm quacks={quacks} addQuack={addQuack} />
              <LoginForm />
            </div>
          </div>
          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
