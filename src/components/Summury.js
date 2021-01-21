import React from "react";
import Card from "./Card";
import NumberFormat from "react-number-format";
import corona from "../assets/corona.png";

function Summury(props) {
  const { totalConfiremd, totalRecoverd, totalDeaths, country } = props;

  return (
    <div className="all-info">
      <div>
        <img src={corona} alt="covid-19" />
      </div>
      <div>
        <h1>{country === "" ? "World Wide Corona Tracker" : country}</h1>
      </div>
      <div className="detail-box">
        <Card>
          <span className="heading" >Total Confirmed</span>
          <br />
          <span>
            {
              <NumberFormat
                value={totalConfiremd}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </span>
        </Card>
        <Card>
          <span className="heading">Total Recovered</span>
          <br />
          <span>
            {
              <NumberFormat
                value={totalRecoverd}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </span>
        </Card>
        <Card>
          <span className="heading">Total Death</span>
          <br />
          <span>
            {
              <NumberFormat
                value={totalDeaths}
                displayType={"text"}
                thousandSeparator={true}
              />
            }
          </span>
        </Card>
      </div>
    </div>
  );
}

export default Summury;
