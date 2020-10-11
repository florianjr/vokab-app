import React, { Fragment } from "react";
import { Main, Heading, Paragraph } from "grommet";
import { useAuth0 } from "@auth0/auth0-react";
import { HomeContent } from "../components";
import Landing from "./landing";

const Home = () => {

  const {isAuthenticated} = useAuth0();

  return (
    <Fragment>
      {isAuthenticated
      ? <HomeContent/>
      : <Landing/>}
    </Fragment>
  );
};

export default Home;
