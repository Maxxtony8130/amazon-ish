import React from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "../util";

function Auth() {
  const query = useQuery();

  let path;
  if (query.get("mode") === "resetPassword") {
    path = `/password-reset?mode=resetPassword&code=${query.get("oobCode")}`;
  } else if (query.get("mode") === "verifyEmail") {
    path = `/login?code=${query.get("oobCode")}`;
  } else {
    path = "/";
  }

  return <Redirect to={path} />;
}

export default Auth;
