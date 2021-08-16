import { useEffect, useState, useContext } from "react";
import QuestionsList from "../components/Questions/QuestionsList";
import CategoriesList from "../components/Questions/CategoriesList";
import AuthContext from "../store/auth-context";
import { Fragment } from 'react';

const QuestionsPage = () => {
  const authCtx = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8080/api/categories", {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });
      const responseData = await response.json();

      const loadedCategories = [];

      for (const key in responseData) {
        loadedCategories.push({
          id: key,
          name: responseData[key].name,
        });
      }

      setCategories(loadedCategories);
    };

    fetchCategories();
  }, [authCtx.token]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:8080/api/questions", {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });
      const responseData = await response.json();

      const loadedQuestions = [];

      for (const key in responseData) {
        loadedQuestions.push({
          id: key,
          text: responseData[key].text,
          status: responseData[key].status,
          yesShareQuantity: responseData[key].yesShareQuantity,
          noShareQuantity: responseData[key].noShareQuantity,
        });
      }

      setQuestions(loadedQuestions);
    };

    fetchQuestions();
  }, [authCtx.token]);

  async function fetchQuestionsByCategories(category) {
    //const category = queryParams.get('category');
    const response = await fetch(
      `http://localhost:8080/api/questions?category=${category}`,
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    );
    const responseData = await response.json();

    const loadedQuestions = [];

    for (const key in responseData) {
      loadedQuestions.push({
        id: key,
        text: responseData[key].text,
        status: responseData[key].status,
        yesShareQuantity: responseData[key].yesShareQuantity,
        noShareQuantity: responseData[key].noShareQuantity,
      });
    }

    setQuestions(loadedQuestions);
  }

  return (
    <div className="pr">
      <div className="categories_container">
        <h2>Categories</h2>
        <div className="categories">
          <CategoriesList
            onClick={fetchQuestionsByCategories}
            categoriesList={categories}
          />
        </div>
      </div>
      <div className="questions_container">
        <h2>Questions</h2>
        <div className="questions">
          <QuestionsList questionsList={questions} />
        </div>
      </div>
      </div>
  );
};

export default QuestionsPage;
