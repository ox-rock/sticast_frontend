
import CategoryItem from "./CategoryItem";
import { useHistory } from "react-router-dom";

const QuestionItem = (props) => {

  const history = useHistory();

  const onClickHandler = () => {
    history.push({
      pathname: '/question/'+props.id,
      state: { 
        question: props, 
      },
    }); 
   
  };

  return (
    <div class="box" onClick={onClickHandler}>
      <div class="content">
        <article class="message">
          <div class="message-header">
            {props.text} <CategoryItem name={props.category}></CategoryItem>
          </div>
          <div class="message-body">
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Followers</p>
                  <p class="title">{props.followers}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Forecasts</p>
                  <p class="title">{props.forecasts}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Creation date</p>
                  <p class="title">{props.creationDate}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Expiration date</p>
                  <p class="title">{props.expirationDate}</p>
                </div>
              </div>
            </nav>{" "}
          </div>
        </article>
      </div>
    </div>
  );
};

export default QuestionItem;
