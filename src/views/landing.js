import React from "react";
import { Main, Heading, Paragraph } from "grommet";
import { useTranslation } from "react-i18next";

const Landing = () => {

  const { t } = useTranslation();

  return (
    <Main align="center" pad="large">
      <Heading>Vokab</Heading>
      <Paragraph>{t("An incredible easy vocabulary manager!")}</Paragraph>
    </Main>
  );
};

export default Landing;
