"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Log OUT</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => signIn()}>Log in</button>
      </div>
    );
  }
}

export default Login;
