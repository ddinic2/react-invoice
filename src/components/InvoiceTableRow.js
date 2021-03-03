import React from "react";

const InvoiceTableRow = ({ invoice, index }) => {
//   let dateForShow = new Intl.DateTimeFormat('sr-SR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(invoice.DateOfInvoice);
let dateForShow = new Intl.DateTimeFormat('sr-SR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(invoice.DateOfInvoice);
let numberOfAmount = invoice.Amount.toLocaleString('de-DE');
let description = invoice.Description.length > 20? invoice.Description.substring(0,20) + '...': invoice.Description;
  return (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{invoice.Title}</td>
      <td>{dateForShow}</td>
      <td>{numberOfAmount}</td>
      <td>{invoice.InvoiceNumber}</td>
      <td>{invoice.Company}</td>
      <td title={invoice.Description}>{description}</td>
      <td>
          <button className="btn btn-warning btn-sm mr-2" type="button">edit</button>
          <button className="btn btn-danger btn-sm" type="button">delete</button>
      </td>
    </tr>
  );
};

export default InvoiceTableRow;
