import { useState } from "react";
import SignIn from "../components/AccountPage/SignIn";
import SignUp from "../components/AccountPage/SignUp";

export interface Login {
  toggleLogin: () => void;
}

const AccountPage = () => {
  const [isLogin, setLogin] = useState(true);

  const toggleLogin = () => {
    setLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? (
        <SignIn toggleLogin={toggleLogin} />
      ) : (
        <SignUp toggleLogin={toggleLogin} />
      )}
    </>
  );
};

export default AccountPage;
