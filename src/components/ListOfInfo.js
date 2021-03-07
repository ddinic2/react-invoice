import React from "react";
import InfoDiv from "./InfoDiv";

const ListOfInfo = ({ sumAmounts, sumInvoice }) => {
  let sumAmountsInfos;
  let sumInvoiceInfos;
  if (sumAmounts)
    sumAmountsInfos = sumAmounts.map((data, index) => (
      <InfoDiv data={data} index={index} key={index} />
    ));
  if (sumInvoice)
    sumInvoiceInfos = sumInvoice.map((data, index) => (
      <InfoDiv data={data} index={index} key={index} />
    ));
  return (
    <div>
      <div className="row">
        <div className="col-12">On Invoice</div>
      </div>
      <div className="row">
        {sumInvoiceInfos}
      </div>
      <div className="row">
        <div className="col-12">On Account</div>
      </div>
      <div className="row">{sumAmountsInfos}</div>
    </div>
  );
};

export default ListOfInfo;
