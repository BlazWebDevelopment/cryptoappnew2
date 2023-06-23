"use client";
import React, { useState } from "react";
import "./style/navbar.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import pfp from "@/img/profile.svg";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { data: session } = useSession();
  if (session) {
    return (
      <nav className="navbar">
        <div className="inside-nav-bar">
          <Image
            src={session.user?.image || pfp}
            alt="ProfilePic"
            onClick={toggleDropdown}
            className="profilePic"
            height={128}
            width={128}
          />

          {isDropdownOpen && (
            <div className="menu">
              <hr />
              <h3 className="profileName">{session.user?.name}</h3>
              <ul className="ulDropdown">
                <li className="eachDropdownEl">
                  <Link href={`/dashboard/${session.user?.name}`}>
                    My Profile
                  </Link>
                </li>
                <li className="eachDropdownEl">
                  <button className="signOut" onClick={() => signOut()}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="inside-nav-bar">
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
