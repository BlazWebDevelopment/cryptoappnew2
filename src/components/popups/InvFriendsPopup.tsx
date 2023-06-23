import React from "react";
import "./invFriendsPopup.css";

function InvFriendsPopup(props: any) {
  return (
    <div className="popup">
      <div className="insite-popup">
        <div className="popup-title">
          <h1>Invite friends</h1>
        </div>
        <div className="popup-text">
          <p>
            When you invite your friends to join, you&apos;ll receive an extra
            10% bonus on all your crypto deposits. Take advantage of this
            opportunity to boost your earnings even further!
          </p>
        </div>
        <div className="popup-buttons">
          <button>Copy refferal link</button>
          <button onClick={props.closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default InvFriendsPopup;
