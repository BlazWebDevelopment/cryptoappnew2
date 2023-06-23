import React from "react";
import "./sidebar.css";
import Link from "next/link";
import Image from "next/image";
import friendsInv from "../img/friends-inv.svg";
import { useSession } from "next-auth/react";
import dashboard from "../img/dashboard.svg";
import profile from "../img/profile.svg";

function Sidebar(props: any) {
  const { data: session } = useSession();
  return (
    <div className="side-container">
      <div className="inside-container">
        <Link href={"/dashboard"}>
          <ul className="each-prop">
            <Image
              src={dashboard}
              width={32}
              height={32}
              alt="Invite Friends"
            />
            <li className="name-prop">Dashboard</li>
          </ul>{" "}
        </Link>
        <Link href={`/dashboard/${session?.user?.name}`}>
          <ul className="each-prop">
            <Image src={profile} width={32} height={32} alt="Invite Friends" />
            <li className="name-prop">My profile</li>
          </ul>{" "}
        </Link>
        <ul className="each-prop" onClick={props.popup}>
          <Image src={friendsInv} width={32} height={32} alt="Invite Friends" />
          <li className="name-prop">Invite Friends</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
