import { useEffect, useState } from 'react';
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import CategoryItem from './CategoryItem';
import QuestionItem from './QuestionItem';

//import classes from './questions.module.css';


const Questions = () => {
  const authCtx = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:8080/api/categories', {
        headers: {
            'Authorization': 'Bearer ' + authCtx.token
          }

      });
      const responseData = await response.json();

      const loadedCategories = [];

      for (const key in responseData) {
        loadedCategories.push({
          id: key,
          name: responseData[key].name,

        });
      }
      console.log(loadedCategories);

      setCategories(loadedCategories);
    };

    fetchCategories();
  }, [authCtx.token]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:8080/api/questions', {
        headers: {
            'Authorization': 'Bearer ' + authCtx.token
          }

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
      console.log(loadedQuestions);

      setQuestions(loadedQuestions);
    };

    fetchQuestions();
  }, [authCtx.token]);

  const categoriesList = categories.map((category) => (
    <CategoryItem
      key={category.id}
      id={category.id}
      name={category.name}

    />
  ));

  
  const questionsList = questions.map((question) => (
    <QuestionItem
      key={question.id}
      id={question.id}
      text={question.text}
      status={question.status}
      yesShareQuantity={question.yesShareQuantity}
      noShareQuantity={question.noShareQuantity}
    />
  ));

  return (
    <section>
        <h2>Categories </h2>
        <div className="categoriesList_container"> 
        {categoriesList}
        </div>
        <h2>Questions </h2>
        <div className="categoriesList_container"> 
        {questionsList}
        </div>

    </section>
  );
};

export default Questions;