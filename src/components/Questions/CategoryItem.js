import "./items.css";
import { useHistory } from "react-router-dom";

const CategoryItem = (props) => {
  const history = useHistory();

  const onClickHandler = () => {
    history.push("/questions?category=" + props.name);
    props.onClick(props.name);
  };

  return (
    <div className="category_item">
      <div onClick={onClickHandler}>{props.name}</div>
    </div>
  );
};

export default CategoryItem;
