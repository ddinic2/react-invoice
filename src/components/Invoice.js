import React, { Component } from "react";
import DatePicker from "react-datepicker";

class Invoice extends Component {
  state = {
    Id: null,
    Title: "",
    DateOfInvoice: new Date(),
    Amount: null,
    InvoiceNumber: "",
    Company: "",
    Description: "",
    Files: {},
    ValidationMsg: "",
  };

  showForm = (e) => {
    if (e) e.preventDefault();
    let form = document.querySelector(".form-division");
    if (form.classList.value === "form-division") {
      form.classList.value = "form-division active";
    } else {
      form.classList.value = "form-division";
    }
  };

  setStartDate = (date) => {
    this.setState({
      DateOfInvoice: date,
    });
  };

  updateStateValues = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validForm = () => {
    if (
      this.state.Title !== "" &&
      this.state.InvoiceNumber !== "" &&
      this.state.Amount &&
      this.state.DateOfInvoice &&
      this.state.Company !== "" &&
      this.state.Description !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  saveInvoice = (e) => {
    e.preventDefault();
    if (this.validForm()) {
      this.props.saveInvoice(this.state);
      this.resetFields();
      this.showForm();
    } else {
      this.setState({
        ValidationMsg: "Please fill all fields.",
      });
    }
  };

  resetFields = () => {
    this.setState({
      Title: "",
      DateOfInvoice: new Date(),
      Amount: null,
      InvoiceNumber: "",
      Company: "",
      Description: "",
      Files: {},
      ValidationMsg: "",
    });
    document.querySelector(".reset-form").click();
  };

  componentWillReceiveProps () {
    if (this.props.editInvoice) {
      console.log('initial', this.props.editInvoice)
      this.setState({
        Id: this.props.editInvoice.Id,
        Title: this.props.editInvoice.Title,
        DateOfInvoice: this.props.editInvoice.DateOfInvoice,
        Amount: this.props.editInvoice.Amount,
        InvoiceNumber: this.props.editInvoice.InvoiceNumber,
        Company: this.props.editInvoice.Company,
        Description: this.props.editInvoice.Description,
        Files: {},
        ValidationMsg: this.props.editInvoice.ValidationMsg,
      });
     console.log('state', this.state)
     document.querySelector('[name="Title"]').value = this.state.Title;
    }
  }

  render() {
    //const financialGoal = (evt.target.validity.valid) ? evt.target.value : this.state.financialGoal;
    let startDate;
    let companies = this.props.companies;
    let listOfOptions = companies.map((company, index) => {
      return (
        <option key={index} value={company.Title}>
          {company.Title}
        </option>
      );
    });

    if (this.state.DateOfInvoice) {
      startDate = this.state.DateOfInvoice;
    }

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
          <form action="" onSubmit={(e) => this.saveInvoice(e)}>
            <div className="row">
              <div className="col-3">
                <input
                  name="Title"
                  onChange={(e) => this.updateStateValues(e)}
                  type="text"
                  className="form-control inpT"
                  placeholder="Short title"
                ></input>
              </div>
              <div className="picker-column-2">
                <div className="customDatePickerWidth">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    className="form-control"
                    placeholderText="Date of invoice"
                    onChange={(date) => this.setStartDate(date)}
                  />
                </div>
              </div>
              <div className="col-2">
                {/* <input type="text" pattern="[0-9]*"
     onInput={this.handleChange.bind(this)} value={this.state.financialGoal} /> */}
                <input
                  className="form-control inpN"
                  placeholder="Amount"
                  onChange={(e) => this.updateStateValues(e)}
                  name="Amount"
                  type="number"
                  pattern="[0-9]*"
                ></input>
              </div>
              <div className="col-2">
                <input
                  className="form-control inpT"
                  placeholder="Invoice number"
                  onChange={(e) => this.updateStateValues(e)}
                  name="InvoiceNumber"
                  type="text"
                ></input>
              </div>
              <div className="col-3">
                <select
                  onChange={(e) => this.updateStateValues(e)}
                  className="form-control inpT"
                  name="Company"
                >
                  <option value="">Company</option>
                  {listOfOptions}
                </select>
              </div>
            </div>
            <div className="row mt-2 mb-2">
              <div className="col-12">
                <textarea
                  onChange={(e) => this.updateStateValues(e)}
                  placeholder="Description"
                  name="Description"
                  cols="30"
                  rows="4"
                  className="form-control inpT"
                ></textarea>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <small className="error-msg">{this.state.ValidationMsg}</small>
              </div>
            </div>
            <div className="row mb-4 float-right">
              <div className="col-12">
                <button type="submitt" className="btn btn-primary">
                  Save
                </button>
                <input
                  className="display-none reset-form"
                  type="reset"
                  defaultValue="Reset"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Invoice;
