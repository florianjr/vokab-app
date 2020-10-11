import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Heading, Paragraph, Box, Table, TableHeader, TableRow, TableCell, TableBody, Main, Button } from "grommet";
import { Add } from "grommet-icons"
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom"

const Words = () => {
  const [words, setWords] = useState([]);
  const [vocabulary, setVocabulary] = useState({})
  const [plainLanguageCode, setPlainLanguageCode] = useState("")
  const [translatedLanguageCode, setTranslatedLanguageCode] = useState("")
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation()

  const { id } = useParams();

  const getVocabulary = async () => {
    try {

      const token = await getAccessTokenSilently({
        audience: "http://localhost:1871"
      })
      const response = await fetch(`${serverUrl}/api/vocabulary/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      const responseData = await response.json();

      setWords(responseData.words)
      setVocabulary(responseData.vocabulary)
      console.log(responseData.vocabulary)
      setPlainLanguageCode(responseData.vocabulary.plainLanguage.code)
      setTranslatedLanguageCode(responseData.vocabulary.translatedLanguage.code)
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    getVocabulary()
  }, [])

  return (
    <Box align="center">
      <Box align="center">
        <Heading>{t("vocabulary")}: {vocabulary.name}</Heading>
        <Paragraph>{t("Here you can see your added words.")}</Paragraph>
      </Box>
      <Box align="center" margin="medium">
        <Table >
          <TableHeader>
            <TableRow>
              <TableCell>
                {t(`language_${plainLanguageCode}`)}
              </TableCell>
              <TableCell>
                {t(`language_${translatedLanguageCode}`)}
              </TableCell>
              <TableCell>
                {t("word_category")}
              </TableCell>
              <TableCell>
                <Link to={"/vocabulary/" + vocabulary.id + "/addWord"}><Button icon={<Add />}></Button></Link>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words.map(w => (
              <TableRow>
                <TableCell>
                  {w.plain}
                </TableCell>
                <TableCell>
                  <strong>{w.translation}</strong>
                </TableCell>
                <TableCell>
                  {w.wordCategory.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Words;