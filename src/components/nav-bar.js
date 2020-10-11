import React from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { isCompositeComponent } from "react-dom/test-utils";

import { Header, Button, DropButton, Box } from 'grommet'
import { Home, Menu as MenuIcon, Globe } from 'grommet-icons'
import FlagIcon from "./flagIcon";
import i18n from "../i18n";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Header background="brand">
      <Link to="/"><Button icon={<Home />} hoverIndicator /></Link>
      <AuthNav></AuthNav>
      <DropButton icon={<Globe />} dropAlign={{ top: "button", right: "right" }} dropContent={
        <Box>
          <Button icon={<FlagIcon code="de" />} onClick={() => i18n.changeLanguage("de")}></Button>
          <Button icon={<FlagIcon code="gb" />} onClick={() => i18n.changeLanguage("en")}></Button>
          <Button icon={<FlagIcon code="fr" />} onClick={() => i18n.changeLanguage("fr")}></Button>
        </Box>
      }></DropButton>
    </Header>
  );
};

export default NavBar;
