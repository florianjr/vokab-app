import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "grommet";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { t } = useTranslation();
  return (
    <Button secondary label={t("button_logout")} onClick={logout}></Button>
  );
};

export default LogoutButton;
