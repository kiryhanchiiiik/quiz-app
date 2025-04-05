import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { config } from "../config";

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
        const stepsData = response.data.items;

        const questionsData = {};
        for (const step of stepsData) {
          const questionId = step.fields.questions.sys.id;
          const questionUrl = `spaces/${config.spaceId}/environments/${config.environment}/entries/${questionId}?access_token=${config.accessToken}`;
          const qResponse = await axiosInstance.get(questionUrl);
          questionsData[step.sys.id] = qResponse.data.fields;
        }

        setSteps(stepsData);
        setQuestionsByStep(questionsData);
        setLoading(false);
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
