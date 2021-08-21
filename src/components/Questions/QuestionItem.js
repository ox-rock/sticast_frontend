import React from "react";
import CanvasJSReact from "./canvasjs.react";
import CategoryItem from "./CategoryItem";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const QuestionItem = (props) => {
  const options = {
    data: [
      {
        type: "doughnut",
        dataPoints: [
          { label: "Yes", y: props.yesShareQuantity },
          { label: "No", y: props.noShareQuantity },
        ],
      },
    ],
  };

  <CanvasJSChart options={options} />;

  return (
    
      <div class="box">
          <div class="content">
          <article class="message">
            <div class="message-header">
              {props.text} <CategoryItem name={props.category}></CategoryItem>
    
            </div>
            <div class="message-body">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Forecasts</p>
                    <p class="title">3,456</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Followers</p>
                    <p class="title">123</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Creation date</p>
                    <p class="title">456K</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">Expiration date</p>
                    <p class="title">22/2/2021</p>
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
