import React, { useState, useEffect, forwardRef, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Heading,
  Paragraph,
  Box,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Main,
  Button,
} from "grommet";
import { Add, FormTrash, Trash } from "grommet-icons";
import FlipMove from "react-flip-move";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import useSecureRequest from "../../hooks/useSecureRequest";
import { Loading } from "../../components";

const FunctionalWord = forwardRef((props, ref) => {
  const { t } = useTranslation();

  return (
    <TableRow ref={ref}>
      <TableCell>{props.plain}</TableCell>
      <TableCell>
        <strong>{props.translation}</strong>
      </TableCell>
      <TableCell>{t(`word_category_${props.wordCategoryName}`)}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            props.removeWord(props.wordId, props.index);
          }}
          icon={<FormTrash />}
        />
      </TableCell>
    </TableRow>
  );
});

const Words = () => {
  const [words, setWords] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();

  const { id } = useParams();

  const { data, loading, error } = useSecureRequest(`/vocabulary/${id}`);

  const removeWord = async (wordId, index) => {
    try {
      const token = await getAccessTokenSilently({
        audience: serverUrl,
      });
      const response = await fetch(
        `${serverUrl}/api/vocabulary/${id}/${wordId}/removeWord`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newWords = [...words];
      newWords.splice(index, 1);
      setWords(newWords);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setWords(data.words);
  }, [data.words]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Box align="center">
          <Box align="center">
            <Heading>
              {t("vocabulary")}: {data.vocabulary.name}
            </Heading>
            <Paragraph>{t("Here you can see your added words.")}</Paragraph>
          </Box>
          <Box align="center" margin="medium">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>
                    {t(`language_${data.vocabulary.plainLanguage.code}`)}
                  </TableCell>
                  <TableCell>
                    {t(`language_${data.vocabulary.translatedLanguage.code}`)}
                  </TableCell>
                  <TableCell>{t("word_category")}</TableCell>
                  <TableCell>
                    <Link to={"/vocabulary/" + data.vocabulary.id + "/addWord"}>
                      <Button icon={<Add />}></Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <FlipMove typeName={null}>
                  {words.map((w, index) => (
                    <FunctionalWord
                      plain={w.plain}
                      translation={w.translation}
                      wordCategoryName={w.wordCategory.name}
                      removeWord={removeWord}
                      wordId={w.id}
                      index={index}
                    />
                  ))}
                </FlipMove>
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default Words;
