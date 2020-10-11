import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "grommet";
import { useTranslation } from "react-i18next";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();
  return (
    <Button primary label={t("button_login")} onClick={loginWithRedirect}></Button>
  );
};

export default LoginButton;
