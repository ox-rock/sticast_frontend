import { Fragment } from "react";
import { useEffect, useState, useContext } from "react";
import CommentsList from "../components/Questions/CommentsList";
import CommentForm from "../components/Questions/CommentForm";
import Question from "../components/Questions/Question";
import { useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";

const QuestionPage = () => {
  const { id } = useParams();
  const authCtx = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [noComments, setnoComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:8080/api/question/${id}/comments`,
        {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      const responseData = await response.json();

      const loadedComments = [];
      console.log(responseData);

      if (responseData.length === 0) setnoComments(true);
      else {
        for (const key in responseData) {
          loadedComments.push({
            id: key,
            text: responseData[key].text,
            timestamp: responseData[key].timestamp,
            user: responseData[key].user.username,
          });
        }

        setComments(loadedComments);
      }
    };

    fetchComments();
  }, [authCtx.token]);

  return (
    <Fragment>
      <Question />
      <CommentForm />
      {noComments && <h2 className="has-text-centered"><i>No comments yet</i></h2>}
      {!noComments && <CommentsList commentsList={comments} />}
    </Fragment>
  );
};

export default QuestionPage;
