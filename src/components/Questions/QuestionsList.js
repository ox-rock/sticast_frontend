import QuestionItem from "./QuestionItem";

const QuestionsList = (props) => {
  return props.questionsList.map((question) => (
    <div className="column is-half-desktop">
      <QuestionItem
        key={question.id}
        id={question.id}
        text={question.text}
        status={question.status}
        yesShareQuantity={question.yesShareQuantity}
        noShareQuantity={question.noShareQuantity}
        category={question.category}
        followers={question.followers}
        creationDate={question.creationDate}
        expirationDate={question.expirationDate}
        forecasts={question.forecasts}
      />
    </div>
  ));
};

export default QuestionsList;
