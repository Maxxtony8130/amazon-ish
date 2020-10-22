import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "../util";

function Auth() {
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    if (query.get("mode") === "resetPassword") {
      history.replace(`/password-reset?mode=resetPassword&code=${query.get("oobCode")}`);
    } else if (query.get("mode") === "verifyEmail") {
      history.replace(`/login?code=${query.get("oobCode")}`);
    } else {
      history.replace("/");
    }
  }, []);

  return null;
}

export default Auth;
