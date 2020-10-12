import React, { Fragment, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Button,
  Heading,
  Grid,
  ResponsiveContext,
} from "grommet";
import { Add } from "grommet-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Vocabularies(props) {
  const voc = props.vocabularies;
  const { t } = useTranslation();
  const size = useContext(ResponsiveContext);

  console.log(size);

  if (voc.length == 0) {
    return (
      <Card pad="large">
        <CardHeader>
          {t("Let's get started by creating a new vocabulary!")}
        </CardHeader>
        <Box align="center">
          <CardBody pad="medium">
            <Link to="/vocabulary/new">
              <Button
                primary
                icon={<Add />}
                label={t("vocabulary_new")}
              ></Button>
            </Link>
          </CardBody>
        </Box>
      </Card>
    );
  } else {
    return (
      <Fragment>
        <Box pad="large">
          <Grid columns={size !== "small" ? "medium" : "100%"} gap="medium">
            <Link to={`/vocabulary/new`}>
              <Card pad="large" background="brand" fill="vertical">
                <CardBody align="center" justify="center">
                  <Add size="large" />
                </CardBody>
              </Card>
            </Link>
            {voc.map((v, index) => (
              <Link to={`/vocabulary/${v.id}`}>
                <Card pad="large" background="brand" key={index}>
                  <CardHeader>
                    <Heading level="3">{v.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    {t("created")}: {v.createdAt}
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>
        </Box>
      </Fragment>
    );
  }
}
