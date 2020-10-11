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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Add } from "grommet-icons";

const HomeContent = () => {
  const { t } = useTranslation();
  const [vocabularies, setVocabularies] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently, user } = useAuth0();

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
    <Main pad="large">
      <Heading level="1">
        {t("Hello")}, {user.given_name ? user.given_name : user.name}!
      </Heading>
      <Paragraph>{t("Today is a good day to learn vocabulary.")}</Paragraph>
      <Box direction="row" margin={{ vertical: "medium" }}>
        {vocabularies.length == 0 ? (
          <Card pad="large">
            <CardHeader>
              {t("Let's get started by creating a new vocabulary!")}
            </CardHeader>
            <Box align="center">
              <CardBody pad="medium">
                <Link to="/newVocabulary">
                  <Button
                    primary
                    icon={<Add />}
                    label={t("vocabulary_new")}
                  ></Button>
                </Link>
              </CardBody>
            </Box>
          </Card>
        ) : (
          vocabularies.map((v) => (
            <Box pad="large">
              <Card pad="large" background="brand">
                <CardHeader>
                  <Heading level="3">{v.name}</Heading>
                </CardHeader>
                <CardBody>
                  {t("created")}: {v.createdAt}
                </CardBody>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Main>
  );
};

export default HomeContent;
