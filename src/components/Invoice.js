import React, { Component } from "react";
import DatePicker from "react-datepicker";

class Invoice extends Component {
  state = {
    Id: null,
    Title: "",
    DateOfInvoice: new Date(),
    DateOfPayment: new Date(),
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
      this.resetFields();
    } else {
      form.classList.value = "form-division";
    }
  };

  setStartDate = (date, type) => {
    if(type === 'DateOfInvoice'){
      this.setState({
        DateOfInvoice: date,
      });
    }
    if(type === 'DateOfPayment'){
      this.setState({
        DateOfPayment: date,
      });
    }
  };

  updateStateValues = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "Amount") {
      this.formatNumber(e);
    }
  };

  validForm = () => {
    if (
      this.state.Title !== "" &&
      this.state.InvoiceNumber !== "" &&
      this.state.Amount !== "" &&
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
        ValidationMsg: "Please fill all fields correct.",
      });
    }
  };

  resetFields = () => {
    this.setState(
      {
        Id: null,
        Title: "",
        DateOfInvoice: new Date(),
        DateOfPayment: null,
        Amount: null,
        InvoiceNumber: "",
        Company: "",
        Description: "",
        Files: {},
        ValidationMsg: "",
      },
      () => document.querySelector(".reset-form").click()
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.editInvoice && nextProps.editInvoice.Title) {
      this.setState(
        {
          Id: nextProps.editInvoice.Id,
          Title: nextProps.editInvoice.Title,
          DateOfInvoice: nextProps.editInvoice.DateOfInvoice,
          DateOfInvoice: nextProps.editInvoice.DateOfPayment,
          Amount: nextProps.editInvoice.Amount,
          InvoiceNumber: nextProps.editInvoice.InvoiceNumber,
          Company: nextProps.editInvoice.Company,
          Description: nextProps.editInvoice.Description,
          Files: {},
          ValidationMsg: nextProps.editInvoice.ValidationMsg,
        },
        () => this.setFields()
      );
    }
  }

  setFields = () => {
    document.querySelector('[name="Title"]').value = this.state.Title;
    document.querySelector('[name="Amount"]').value = this.state.Amount;
    document.querySelector(
      '[name="InvoiceNumber"]'
    ).value = this.state.InvoiceNumber;
    document.querySelector('[name="Company"]').value = this.state.Company;
    document.querySelector(
      '[name="Description"]'
    ).value = this.state.Description;
    this.setStartDate(this.state.DateOfInvoice, 'DateOfInvoice');
    if(this.state.DateOfPayment){
      this.setStartDate(this.state.DateOfPayment, 'DateOfPayment');
    }
  };

  formatNumber = (e) => {
    let currentInput = e.target.value;
    let fixedInput = "";
    if (e.target.value.length > 1) {
      fixedInput = currentInput.replace(/[A-Za-z!@#$%^.&*()]/g, "");
    } else {
      fixedInput = currentInput.replace(/[A-Za-z!@#$%^.,&*()]/g, "");
    }
    e.target.value = fixedInput;
  };

  render() {
    let startDate;
    let dateOfPayment;
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
    if (this.state.DateOfPayment) {
      dateOfPayment = this.state.DateOfPayment;
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
                    onChange={(date) => this.setStartDate(date, 'DateOfInvoice')}
                  />
                </div>
              </div>
              <div className="col-2">
                <input
                  className="form-control inpN"
                  placeholder="Amount"
                  onChange={(e) => this.updateStateValues(e)}
                  name="Amount"
                  type="text"
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
            <div className="row">
            <div className="picker-column-2 ml-3">
                <div className="customDatePickerWidth">
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={dateOfPayment}
                    className="form-control"
                    placeholderText="Date of payment"
                    onChange={(date) => this.setStartDate(date, 'DateOfPayment')}
                  />
                </div>
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
