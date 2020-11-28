import React from "react";
import { useAuth } from "../Services/AuthService";
import { Route, Redirect } from "react-router-dom";
import { useEffect } from 'react';

export default function Logout() {
  const { setAuthTokens } = useAuth();

  useEffect(() => {
    setAuthTokens();
  });

  return (
    <Route><Redirect to="/login" /></Route>
  );
}

