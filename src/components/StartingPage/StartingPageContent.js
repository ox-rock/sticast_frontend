import "./StartingPageContent.css";
import img from "./pngwing.com.png";

const StartingPageContent = () => {
  return (
    
      <section className="starting">
        <h2>StiCast!</h2>
        is a forecasting platform where payoffs are tied to the outcomes of
        future events. Participants trade contracts associated to the occurrence
        of a given event. The market exchange of contracts determines their
        price: in general, the higher the price of a contract, the higher the
        confidence of the market in the future occurrence of the associated
        event.<br></br>
        <img src={img} alt="aaa"></img>
        <br></br>
        <b>Choose a question</b> <br></br>Filter by category and browse for your
        favourite questions.
      </section>
    
  );
};

export default StartingPageContent;
