import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Form, FormField, TextInput, Select, Paragraph } from "grommet";
import { Add } from "grommet-icons"
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

const AddWord = () => {
    const [value, setValue] = useState({});
    const [wordCategoryOptions, setWordCategoryOptions] = useState([])
    const [vocabulary, setVocabulary] = useState({});
    const [plainLanguageCode, setPlainLanguageCode] = useState("")
    const [translatedLanguageCode, setTranslatedLanguageCode] = useState("")
    const { id } = useParams()
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    let wordCategories = []

    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation()
    const history = useHistory();

    const getVocabulary = async () => {
        try {
            const token = await getAccessTokenSilently({
                audience: "http://localhost:1871"
            })
            const response = await fetch(`${serverUrl}/api/vocabulary/${id}/meta`, { headers: { Authorization: `Bearer ${token}` } });

            const responseData = await response.json();

            setVocabulary(responseData.vocabulary)
            setPlainLanguageCode(responseData.vocabulary.plainLanguage.code)
            setTranslatedLanguageCode(responseData.vocabulary.translatedLanguage.code)

            wordCategories = await responseData.wordCategories
            wordCategories.map(wc => {
                setWordCategoryOptions(wco => wco.concat({l: t(`word_category_${wc.name}`), v: wc.id}))
            })
        } catch (error) {
            console.log(error.message)
        }
    };

    const addWord = async () => {
        try {
            console.log(value)
            const token = await getAccessTokenSilently({
                audience: serverUrl
            })
            const response = await fetch(`${serverUrl}/api/vocabulary/${id}/addWord`, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
                body: JSON.stringify({
                    plain: value.plain,
                    translation: value.translation,
                    wordCategoryId: value.wordCategory.v
                })
            })
            history.push(`/vocabulary/${vocabulary.id}/`)
        } catch(e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getVocabulary()
    }, [])

    return (
        <Box align="center">
            <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
                onSubmit={addWord}
            >
                <FormField name="plain" htmlfor="text-input-id" label={t(`language_${plainLanguageCode}`)}>
                    <TextInput id="text-input-id" name="plain" />
                </FormField>
                <FormField name="translation" htmlfor="text-input-id" label={t(`language_${translatedLanguageCode}`)}>
                    <TextInput id="text-input-id" name="translation" />
                </FormField>
                <FormField name="wordCategory" label={t(`word_category`)}>
                    <Select name="wordCategory" options={wordCategoryOptions} labelKey="l" valueKey="v"></Select>
                </FormField>
                <Box direction="row" gap="medium">
                    <Button type="submit" primary label={t("form_submit")} />
                </Box>
            </Form>
        </Box>
    );
};

export default AddWord;
