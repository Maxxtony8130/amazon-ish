import React, { useEffect } from "react";
import "./Profile.css";
import { useHistory } from "react-router-dom";
import db, { auth } from "../firebase";
import { useStateValue } from "../StateProvider";

function Profile() {
  const history = useHistory();
  const [{ user, loadingBar }] = useStateValue();

  useEffect(() => {
    if (loadingBar) {
      loadingBar.current.continuousStart();
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(() => {
            if (loadingBar) {
              loadingBar.current.complete();
            }
          });
        unsubscribe();
      } else {
        history.replace("/login?next=profile");
        if (loadingBar) {
          loadingBar.current.complete();
        }
      }
    });
  }, []);

  const signOut = () => {
    loadingBar.current.continuousStart();
    auth.signOut().then(() => {
      setTimeout(() => {
        loadingBar.current.complete();
        history.push("/");
      }, 1000);
    });
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <img className="profile__avatar" src={user?.photoURL} />
        <span>
          <h3>Hi, {user?.displayName}</h3>
          <p style={{ maxWidth: "480px", marginBottom: "2rem", opacity: 0.5 }}>
            This is your profile page. Here, you can view and customize your
            profile details. Double check your details before check out.
          </p>
        </span>
        <div className="buttons" style={{ marginLeft: "auto" }}>
          <button className="button buttonPrimary" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
      <div className="profile__inner">
        <p> Display Name: {user?.displayName}</p>
      </div>
    </div>
  );
}
export default Profile;
