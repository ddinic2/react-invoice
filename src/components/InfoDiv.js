import React from "react";

const InfoDiv = ({ data, index }) => {
    let dataAmount = data.Amount.toLocaleString('de-DE');
  return (
    <div className={`${index === 3 || index === 4 ? "col-3" : "col-2"}`}>
      <div className="info-holder">
        <div className="title-div">{data.Title}</div>
        <div className="amount-div"><h4>{dataAmount}</h4></div>
      </div>
    </div>
  );
};

export default InfoDiv;
