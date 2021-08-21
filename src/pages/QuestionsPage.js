import { useEffect, useState, useContext } from "react";
import QuestionsList from "../components/Questions/QuestionsList";
import AuthContext from "../store/auth-context";
import SearchBar from "../components/Questions/SearchBar";


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
      
      const response = await fetch("http://localhost:8080/api/questions?category=all", {
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
    <div className="container">
      <div className="categories_container">
        <SearchBar categoriesList={categories} onClick={fetchQuestionsByCategories}/>
      </div>
      <div className="questions_container">
      <div class="divider">Questions</div>
        <div className="columns is-multiline is-desktop">
          <QuestionsList questionsList={questions} />
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
