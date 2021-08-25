import CategoryItem from "./CategoryItem";
import { useHistory } from "react-router-dom";

const QuestionItem = (props) => {
  const history = useHistory();

  const onClickHandler = () => {
    history.push({
      pathname: "/question/" + props.id,
      state: {
        question: props,
      },
    });
  };

  return (
    <div class="box" onClick={onClickHandler}>
      <article class="message">
        <div class="message-header">
          {props.text} <CategoryItem name={props.category}></CategoryItem>
        </div>
        <div class="message-body">
          <div class="columns is-multiline is-mobile">
            <div class="column has-text-centered is-half-mobile is-half-tablet">
              <div>
                <p class="heading is-size-7">Followers</p>
                <p class="title">{props.followers}</p>
              </div>
            </div>
            <div class="column has-text-centered is-half-mobile is-half-tablet">
              <div>
                <p class="heading is-size-7">Forecasts</p>
                <p class="title">{props.forecasts}</p>
              </div>
            </div>
            <div class="column has-text-centered is-half-mobile is-half-tablet">
              <div>
                <p class="heading is-size-7">Creation date</p>
                <p class="title">{props.creationDate}</p>
              </div>
            </div>
            <div class="column has-text-centered is-half-mobile is-half-tablet">
              <div>
                <p class="heading is-size-7">Expiration date</p>
                <p class="title">{props.expirationDate}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default QuestionItem;
