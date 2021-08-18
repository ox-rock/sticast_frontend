import "./StartingPageContent.css";
import img from "./leaflet.png";
import img2 from "./pencil.png";
import img3 from "./coding.png";
import img4 from "./money.png";
import { Fragment } from "react";

const StartingPageContent = () => {
  return (
    <Fragment>
      <div className="starting">
        <b>StiCast! </b>
        is a forecasting platform where payoffs are tied to the outcomes of
        future events. Participants trade contracts associated to the occurrence
        of a given event. The market exchange of contracts determines their
        price: in general, the higher the price of a contract, the higher the
        confidence of the market in the future occurrence of the associated
        event.
      </div>
      <div className="prova2">
        <div className="item">
          <img src={img} alt="aaa"></img>
          <br></br>
          <b>Choose a question</b> <br></br>Filter by category and browse for
          your favourite questions.
        </div>
        <div className="item">
          <img src={img2} alt="aaa"></img>
          <br></br>
          <b>Make your forecast</b> <br></br>Add your predictions and influence
          the trend of the questions.
        </div>
        <div className="item">
          <img src={img3} alt="aaa"></img>
          <br></br>
          <b>Update your forecast</b> <br></br>While a question is still open
          you can always change your prediction.
        </div>
        <div className="item">
          <img src={img4} alt="aaa"></img>
          <br></br>
          <b>Earn rewards</b> <br></br>When the answer is known, check if your
          prediction was right and how much you won.
        </div>
      </div>
    </Fragment>
  );
};

export default StartingPageContent;
