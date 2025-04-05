import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { config } from "../config";
import { algoliasearch } from "algoliasearch";

const client = algoliasearch("WLRMVTXBPD", "0a50acee2e1d278b2b361c1f4dcff128");

export const useQuizData = () => {
  const [steps, setSteps] = useState([]);
  const [questionsByStep, setQuestionsByStep] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const url = `spaces/${config.spaceId}/environments/${config.environment}/entries?content_type=step&access_token=${config.accessToken}`;
        const response = await axiosInstance.get(url);

        if (
          response.data &&
          response.data.items &&
          response.data.items.length > 0
        ) {
          const stepsData = response.data.items;

          const questionsData = {};
          for (const step of stepsData) {
            if (
              step.fields &&
              step.fields.questions &&
              step.fields.questions.sys
            ) {
              const questionId = step.fields.questions.sys.id;
              const questionUrl = `spaces/${config.spaceId}/environments/${config.environment}/entries/${questionId}?access_token=${config.accessToken}`;
              const qResponse = await axiosInstance.get(questionUrl);

              if (qResponse.data && qResponse.data.fields) {
                questionsData[step.sys.id] = qResponse.data.fields;
              } else {
                console.error(
                  `Question data not found for step ID: ${step.sys.id}`
                );
              }
            } else {
              console.error(`No question found for step ID: ${step.sys.id}`);
            }
          }

          setSteps(stepsData);
          setQuestionsByStep(questionsData);
          setLoading(false);

          const objectsToSend = Object.values(questionsData).map(
            (question, index) => ({
              objectID: `question_${index}`,
              questionText: question.questionText,
              answers: question.answers,
              correctAnswer: question.correctAnswer,
            })
          );

          client
            .saveObjects(objectsToSend, { indexName: "questions" })
            .then(({ objectIDs }) => {
              console.log("Data successfully indexed in Algolia:", objectIDs);
            })
            .catch((err) => {
              console.error("Error indexing data:", err);
            });
        } else {
          throw new Error("No items found in response data");
        }
      } catch (e) {
        console.error("Error fetching quiz data", e);
        setError("Failed to load quiz data. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  return { steps, questionsByStep, loading, error };
};
