import React, { Component } from "react";

class Invoice extends Component {
  state = {
    Title: "",
    DateOfInvoice: new Date(),
    Amount: null,
    InvoiceNumber: "",
    ForCompany: "",
    Description: "",
    Files: {},
  };

  showForm = (e) => {
    e.preventDefault();
    let form = document.querySelector(".form-division");
    if (form.classList.value === "form-division") {
      form.classList.value = "form-division active";
    } else {
      form.classList.value = "form-division";
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              onClick={(e) => this.showForm(e)}
              className="float-right btn btn-light mt-2 mb-4"
            >
              Add Invoice
            </button>
          </div>
        </div>
        <div className="form-division">
          <h2>Place for edit/add invoice</h2>
        </div>
      </div>
    );
  }
}

export default Invoice;
