import { useHistory } from "react-router-dom";

const CommentItem = (props) => {
  const history = useHistory();

  return (
    <div className="columns is-justify-content-center mt-1">
      <div className="column is-half">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{props.user}</strong>
                <br />
                {props.text}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CommentItem;
