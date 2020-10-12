import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
  Select,
  Paragraph,
  Heading,
} from "grommet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const NewVocabulary = () => {
  const [value, setValue] = useState({});
  const [availableLanguageOptions, setAvailableLanguageOptions] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();
  const history = useHistory();

  const getAvailableLanguages = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: serverUrl,
      });
      const response = await fetch(`${serverUrl}/api/language`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = await response.json();

      responseData.availableLanguages.map((language) => {
        setAvailableLanguageOptions((availableLanguage) =>
          availableLanguage.concat({
            l: t(`language_${language.code}`),
            v: language.id,
          })
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createVocabulary = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: serverUrl,
      });
      const response = await fetch(`${serverUrl}/api/vocabulary/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value.name,
          plainLanguage: value.plainLanguage.v,
          translatedLanguage: value.translatedLanguage.v,
        }),
      });
      const responseData = await response.json();
      history.push("/vocabulary/" + responseData.result.id);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getAvailableLanguages();
  }, []);

  return (
    <Fragment>
      <Box align="center" pad="large">
        <Heading>New Vocabulary</Heading>
      </Box>
      <Box align="center">
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onReset={() => setValue({})}
          onSubmit={createVocabulary}
        >
          <FormField
            name="name"
            htmlfor="text-input-id"
            label={t(`vocabulary_name`)}
          >
            <TextInput id="text-input-id" name="name" />
          </FormField>
          <FormField name="plainLanguage" label={t(`language_plain`)}>
            <Select
              name="plainLanguage"
              options={availableLanguageOptions}
              labelKey="l"
              valueKey="v"
            ></Select>
          </FormField>
          <FormField name="translatedLanguage" label={t(`language_translated`)}>
            <Select
              name="translatedLanguage"
              options={availableLanguageOptions}
              labelKey="l"
              valueKey="v"
            ></Select>
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label={t("form_submit")} />
          </Box>
        </Form>
      </Box>
    </Fragment>
  );
};

export default NewVocabulary;
