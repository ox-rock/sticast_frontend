import QuestionItem from "./QuestionItem";

const QuestionsList = (props) => {
  return props.questionsList.map((question) => (
    <div className="column is-6">
      <QuestionItem
        key={question.id}
        id={question.id}
        text={question.text}
        status={question.status}
        yesShareQuantity={question.yesShareQuantity}
        noShareQuantity={question.noShareQuantity}
        category={question.category}
      />
    </div>
  ));
};

export default QuestionsList;
