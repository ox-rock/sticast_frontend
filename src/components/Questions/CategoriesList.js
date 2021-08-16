import CategoryItem from "./CategoryItem";

const CategoriesList = (props) => {
  return props.categoriesList.map((category) => (
    <CategoryItem
      key={category.id}
      id={category.id}
      name={category.name}
      onClick={props.onClick}
    />
  ));
};

export default CategoriesList;
