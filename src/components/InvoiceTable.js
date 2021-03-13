import React from "react";
import InvoiceTableRow from "./InvoiceTableRow";

const InvoiceTable = ({ invoices, deleteInvoice, openEditForm }) => {
  let invoiceRows = invoices.map((invoice, index) => (
    <InvoiceTableRow invoice={invoice} index={index} key={index} deleteInvoice={deleteInvoice} openEditForm={openEditForm} />
  ));
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Short title</th>
            <th scope="col">Date of invoice</th>
            <th scope="col">Date of payment</th>
            <th scope="col">Amount</th>
            <th scope="col">Invoice number</th>
            <th scope="col">Company</th>
            <th scope="col">Description</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>{invoiceRows}</tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
