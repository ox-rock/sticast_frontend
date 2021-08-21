import "./main.css";
import "./items.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const SearchBar = (props) => {
  const [advancedSearchDisplayed, setadvancedSearchDisplayed] = useState(false);

  const categories = [{ value: "all", label: "all" }];

  const responseData = props.categoriesList;

  for (const key in responseData) {
    categories.push({
      value: responseData[key].name,
      label: responseData[key].name,
    });
  }

  const status = [
    { value: "all", label: "all" },
    { value: "open", label: "open" },
    { value: "closed", label: "closed" },
  ];

  const history = useHistory();
  const [enteredKeyword, setenteredKeyword] = useState("");
  const [enteredCategory, setenteredCategory] = useState("all");
  const [enteredStatus, setenteredStatus] = useState("open");

  const categoryChangeHandler = (obj) => {
    setenteredCategory(obj.value);
  };

  const statusChangeHandler = (obj) => {
    setenteredStatus(obj.value);
  };

  const keywordChangeHandler = (event) => {
    setenteredKeyword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const category = enteredCategory;
    const status = enteredStatus;
    const keyword = enteredKeyword !== "" ? "&keyword=" + enteredKeyword : "";
    history.push(
      "/questions?category=" + category + "&status=" + status + keyword
    );
    props.onClick(enteredCategory);
  };

  const formClickHandler = (event) => {
    if(advancedSearchDisplayed)
      setadvancedSearchDisplayed(false);
      else
      setadvancedSearchDisplayed(true);
  };

  const advancedSearchDiv = advancedSearchDisplayed
    ? "advance-search"
    : "advance-search hidden";

    const buttonsSearchDiv = advancedSearchDisplayed
    ? "fs-2 mb-3 hidden"
    : "fs-2 mb-3"; 

  return (
    <div className="s007">
      <form>
        <div className="inner-form">
          <div className="basic-search">
            <div className="input-field">
              <div className="icon-wrap">
                <i className="bi bi-search"></i>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                onChange={keywordChangeHandler}
              />
            </div>
          </div>
          <div class={buttonsSearchDiv}>
            <p>Advanced Search</p>
            <i className="bi bi-chevron-double-down" onClick={formClickHandler}></i>
           
          </div>
          <div className={advancedSearchDiv}>
            <span className="desc">Advanced Search</span>

            <div className="boh">Category</div>
            <Select
              options={categories}
              onChange={(option) => categoryChangeHandler(option)}
            />

            <div className="boh">Status</div>
            <Select
              options={status}
              onChange={(option) => statusChangeHandler(option)}
            />

           
              <div className="input-field">
                <button className="btn-search" onClick={submitHandler}>
                  Search
                </button>
              
              </div>
              <div class="fs-2 mb-3">
                  <i className="bi bi-chevron-double-up" onClick={formClickHandler} ></i>
                </div>
          
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
