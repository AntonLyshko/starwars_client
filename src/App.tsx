import React, { useState } from "react";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import "./App.scss";
import "antd/dist/antd.css";
import {
  auth,
  onAuthStateChanged,
  userSignOut,
} from "./firebase/firebase";
import { User } from "firebase/auth";
import { Button } from "antd";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  });

  if (loading) return <>Loading....</>;

  return (
    <div className="App">
      <h2>Star Wars Client</h2>
      <nav>
        {user && (
          <>
            CurrentUser: {user.email}
            <Button onClick={userSignOut}>Logout</Button>
          </>
        )}
      </nav>
      {user ? <Home /> : <Auth />}
    </div>
  );
};

export default App;
