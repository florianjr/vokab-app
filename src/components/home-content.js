import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Main,
  Heading,
  Paragraph,
  Box,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "grommet";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Add } from "grommet-icons";
import Vocabularies from "./vocabularies";
import useSecureRequest from "../hooks/useSecureRequest";
import { Loading } from "../components";

const HomeContent = () => {
  const { t } = useTranslation();
  const [vocabularies, setVocabularies] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { data, loading, error } = useSecureRequest("/vocabulary/");

  const { getAccessTokenSilently, user } = useAuth0();
  const history = useHistory();

  const getAllVocabularies = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: serverUrl,
      });
      const response = await fetch(`${serverUrl}/api/vocabulary/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseData = await response.json();
      setVocabularies(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllVocabularies();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Main pad="large">
          <Heading level="1">
            {t("Hello")}, {user.given_name ? user.given_name : user.name}!
          </Heading>
          <Paragraph>{t("Today is a good day to learn vocabulary.")}</Paragraph>
          <Vocabularies vocabularies={vocabularies} />
        </Main>
      )}
    </Fragment>
  );
};

export default HomeContent;
