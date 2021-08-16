import QuestionItem from "./QuestionItem";

const QuestionsList = (props) => {
  return props.questionsList.map((question) => (
    <QuestionItem
      key={question.id}
      id={question.id}
      text={question.text}
      status={question.status}
      yesShareQuantity={question.yesShareQuantity}
      noShareQuantity={question.noShareQuantity}
    />
  ));
};

export default QuestionsList;
