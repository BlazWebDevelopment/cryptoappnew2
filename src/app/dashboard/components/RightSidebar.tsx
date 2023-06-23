"use client";
import useUser from "@/hooks/useUser";
import "./style/rightSidebar.css";

function RightSidebar() {
  const { user } = useUser();
  return (
    <div className="sidebar-wrapper">
      {user && (
        <div key={user._id} className="inside-sidebar-wrapper">
          <div className="abv-user">
            <p className="balance-p">Balance</p>
            <p className="value-p">${user.balance.toLocaleString()}</p>
          </div>

          <p className="user-p">id - {user._id}</p>
        </div>
      )}
    </div>
  );
}
export default RightSidebar;
