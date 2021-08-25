import { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import CanvasJSReact from "./canvasjs.react";
import { useLocation } from "react-router-dom";
import "./main.css";
import followedIcon from "../../img/follow.png";
import notfollowedIcon from "../../img/unfollow.png";
import ShowViewportWidth from "../Utils/ShowViewportWidth";
import Chart from "react-google-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Question = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const [question, setQuestion] = useState([]);
  const [formBuy, setformBuy] = useState(true);
  const [yesSelect, setyesSelect] = useState(true);
  const [enteredQuantity, setenteredQuantity] = useState("");

  const question_yesShareQnt = location.state.question.yesShareQuantity;
  const question_noShareQnt = location.state.question.noShareQuantity;

  const userBudget = authCtx.userBudget;

  const options = {
    backgroundColor: "transparent",
    data: [
      {
        type: "doughnut",
        dataPoints: [
          { label: "Yes", y: question_yesShareQnt },
          { label: "No", y: question_noShareQnt },
        ],
      },
    ],
  };

  const formBuyChangeHandler = () => {
    setformBuy(true);
  };

  const formSellChangeHandler = () => {
    setformBuy(false);
  };

  const onChangeSelectHandler = (event) => {
    if (event.target.value === "Yes") setyesSelect(true);
    else setyesSelect(false);
  };

  const onChangeQuantityInputHandler = (event) => {
    setenteredQuantity(event.target.value);
  };

  const calculateYesShareBuyPayout = () => {
    const a = enteredQuantity;

    var payout =
      100.0 *
        Math.log(
          Math.exp((+question_yesShareQnt + +a) / 100.0) +
            Math.exp(question_noShareQnt / 100.0)
        ) -
      100.0 *
        Math.log(
          Math.exp(question_yesShareQnt / 100.0) +
            Math.exp(question_noShareQnt / 100.0)
        );

    var payoutFixed = payout.toFixed(2);

    return payoutFixed;
  };

  const calculateNoShareBuyPayout = () => {
    const a = enteredQuantity;

    var payout =
      100.0 *
        Math.log(
          Math.exp(question_yesShareQnt / 100.0) +
            Math.exp((+question_noShareQnt + +a) / 100.0)
        ) -
      100.0 *
        Math.log(
          Math.exp(question_yesShareQnt / 100.0) +
            Math.exp(question_noShareQnt / 100.0)
        );

    var payoutFixed = payout.toFixed(2);
    return payoutFixed;
  };

  const calculateYesShareSellPayout = () => {
    const a = enteredQuantity;

    var payout =
      100.0 *
        Math.log(
          Math.exp((question_yesShareQnt - a) / 100.0) +
            Math.exp(question_noShareQnt / 100.0)
        ) -
      100.0 *
        Math.log(
          Math.exp(question_yesShareQnt / 100.0) +
            Math.exp(question_noShareQnt / 100.0)
        );

    var payoutFixed = -1 * payout.toFixed(2);
    return payoutFixed;
  };

  const calculateNoShareSellPayout = () => {
    const a = enteredQuantity;

    var payout =
      100.0 *
        Math.log(
          Math.exp(question_yesShareQnt / 100.0) +
            Math.exp((question_noShareQnt - a) / 100.0)
        ) -
      100.0 *
        Math.log(
          Math.exp(question_yesShareQnt / 100.0) +
            Math.exp(question_noShareQnt / 100.0)
        );

    var payoutFixed = -1 * payout.toFixed(2);
    return payoutFixed;
  };

  const calculateMaxYesShareBuyable = () => {
    var maxYes = Math.floor(
      100.0 *
        Math.log(
          Math.exp((+userBudget + +question_yesShareQnt) / 100.0) +
            Math.exp((+userBudget + +question_noShareQnt) / 100.0) -
            Math.exp(+question_noShareQnt / 100.0)
        )
    );

    return maxYes - question_yesShareQnt;
  };

  const calculateMaxNoShareBuyable = () => {
    var maxNo = Math.floor(
      100.0 *
        Math.log(
          Math.exp((+userBudget + +question_yesShareQnt) / 100.0) +
            Math.exp((+userBudget + +question_noShareQnt) / 100.0) -
            Math.exp(+question_yesShareQnt / 100.0)
        )
    );

    return maxNo - question_noShareQnt;
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch(
        `http://localhost:8080/api/question/${location.state.question.id}/data`,
        {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      const responseData = await response.json();

      const loadedQuestion = {
        yesShareQuantity: responseData.yesShareQnt,
        noShareQuantity: responseData.noShareQnt,
        followed: responseData.isFollowed,
      };

      setQuestion(loadedQuestion);
    };

    fetchQuestion();
  }, [authCtx.token]);

  let yesShareQuantity = 0;
  if (question.yesShareQuantity) yesShareQuantity = question.yesShareQuantity;

  let noShareQuantity = 0;
  if (question.noShareQuantity) noShareQuantity = question.noShareQuantity;

  const divBuyButton = formBuy ? "tab active" : "tab";
  const divSellButton = formBuy ? "tab" : "tab active";

  const maxQuantitySell = yesSelect ? yesShareQuantity : noShareQuantity;
  const maxQuantityBuy = yesSelect
    ? calculateMaxYesShareBuyable()
    : calculateMaxNoShareBuyable();

  const totalBuy = yesSelect
    ? calculateYesShareBuyPayout()
    : calculateNoShareBuyPayout();

  const totalSell = yesSelect
    ? calculateYesShareSellPayout()
    : calculateNoShareSellPayout();

  return (
    <div className="columns is-desktop is-multiline mt-6">
      <div className="column is-12 has-text-centered is-size-2">
        <div className="is-size-2 is-size-4-mobile">
          <b>{location.state.question.text}</b>
        </div>
      </div>
      <div className="column">
        <CanvasJSChart options={options} />
      </div>
      <div className="column">
        <div className="column has-text-centered is-full">
          {question.followed && <img src={followedIcon}></img>}
          {!question.followed && <img src={notfollowedIcon}></img>}
          <ShowViewportWidth />
        </div>

        <div className="column has-text-centered ">
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Yes</p>
                <p class="title">{yesShareQuantity}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">No</p>
                <p class="title">{noShareQuantity}</p>
              </div>
            </div>
          </nav>
        </div>

        <div className="column">
          <div class="tab-group">
            <ul class="tab-group">
              <li class={divBuyButton} onClick={formBuyChangeHandler}>
                <div className="astyle">Buy</div>
              </li>
              <li class={divSellButton} onClick={formSellChangeHandler}>
                <div className="astyle">Sell</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="column">
          <form>
            {formBuy === true && (
              <div className="columns is-multiline is-mobile">
                <div class="column has-text-centered is-6-mobile">
                  <div class="is-size-6 mb-2">
                    <b>Type</b>
                  </div>
                  <div class="select">
                    <select onChange={onChangeSelectHandler}>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <div class="column is-6-mobile">
                  <div class="has-text-centered is-size-6 mb-2">
                    <b>Quantity (max {maxQuantityBuy})</b>
                  </div>
                  <input
                    class="input"
                    type="number"
                    placeholder="Insert quantity"
                    onChange={onChangeQuantityInputHandler}
                    value={enteredQuantity}
                  />
                </div>

                <div class="column has-text-centered">
                  <div class="has-text-centered is-size-6 mb-2">
                    <b>Total: {totalBuy}$</b>
                  </div>
                  <button class="button is-link">Submit</button>
                </div>
              </div>
            )}

            {formBuy === false && (
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="label">Type</div>
                    <div class="control">
                      <div class="select">
                        <select onChange={onChangeSelectHandler}>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="field-body">
                      <div class="control">
                        <div class="label">
                          Quantity (max {maxQuantitySell})
                        </div>
                        <input
                          class="input"
                          type="number"
                          placeholder="Insert quantity"
                          onChange={onChangeQuantityInputHandler}
                          value={enteredQuantity}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-body is-justify-content-flex-end">
                    <div class="control">
                      <div class="label">Total: {totalSell}$</div>
                      <button class="button is-link">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Question;
