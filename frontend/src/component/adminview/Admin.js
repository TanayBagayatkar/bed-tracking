import React, {  useState } from "react";
import Signin from "../signin";
import AdminView from "./AdminView";

function Admin() {
  const [isUser, setisUser] = useState(true);
  return <div>{isUser ? <AdminView /> : <Signin />}</div>;
}

export default Admin;
