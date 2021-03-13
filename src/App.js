import React, { Component } from "react";
import "./css/App.css";
import Invoice from "./components/Invoice";
import InvoiceTable from "./components/InvoiceTable";
import ListOfInfo from "./components/ListOfInfo";

class App extends Component {
  state = {
    companies: [
      {
        Title: "Tim Sistems",
        Adress: "Beograd Krupanjska 10A",
        Telephone: "011-4024-550",
        PIB: "106560980",
        MB: "20631309",
        Owner: "Toni Apostolovic",
        AccountNo: "285205100000029980",
      },
      {
        Title: "HUMP d.o.o.",
        Adress: "Beograd-Palilula Kneza Danila 9",
        Telephone: "0652355235",
        PIB: "108759080",
        MB: "21062065",
        Owner: "Aleksandar Grbic",
        AccountNo: "",
      },
      {
        Title: "Galapagos DOO",
        Adress: "Novi Beograd Narodnih Heroja 33",
        Telephone: "0642883723",
        PIB: "110764621",
        MB: "21384089",
        Owner: "Jovan Kovacina",
        AccountNo: "",
      },
    ],
    invoices: [
      {
        Id: 1,
        Title: "Racun za TimSistems",
        Company: "Tim Sistems",
        DateOfInvoice: new Date(),
        DateOfPayment: new Date(),
        Amount: 58800,
        InvoiceNumber: "06/2021",
        ForCompany: "Galapagos DOO",
        Description:
          "Usluge održavanja web aplikacije “My Obis”. Cena 2100.00. Ukupno 28h.",
        Files: {},
      },
      {
        Id: 2,
        Title: "Racun za Galapagos",
        Company: "Galapagos DOO",
        DateOfInvoice: new Date(),
        DateOfPayment: new Date(),
        Amount: 900000,
        InvoiceNumber: "07/2021",
        ForCompany: "Tim Sistems",
        Description: "Usluge održavanja web aplikacije.",
        Files: {},
      },
    ],
    sumAmounts: [{ Title: "TODAY", Amount: 58800 },{ Title: "THIS MONTH", Amount: 58800 },{ Title: "THIS YEAR", Amount: 0 },{ Title: "LAST 365", Amount: 0 },{ Title: "LAST YEAR", Amount: 0 }],
    sumInvoice: [{ Title: "TODAY", Amount: 58800 },{ Title: "THIS MONTH", Amount: 58800 },{ Title: "THIS YEAR", Amount: 0 },{ Title: "LAST 365", Amount: 0 },{ Title: "LAST YEAR", Amount: 0 }],
    editInvoice: {}
  };

  today = new Date().getDate();
  thisMonth = new Date().getMonth();
  thisYear = new Date().getFullYear();
  lastYear = new Date().getFullYear() - 1;
  last365 = new Date(new Date().setFullYear(new Date().getFullYear()-1));

  showView = (e) => {
    e.preventDefault();
    let allViews = document.querySelectorAll(".view");
    let allNavItems = document.querySelectorAll(".nav-item");
    for (let i = 0; i < allViews.length; i++) {
      if (allNavItems[i].attributes[1].value === e.target.name) {
        allNavItems[i].classList = "nav-item active";
      } else {
        allNavItems[i].classList = "nav-item";
      }
      if (allViews[i].attributes[1].value === e.target.name) {
        allViews[i].style = "display:block";
      } else {
        allViews[i].style = "display:none";
      }
    }
  };

  saveInvoice = (invoice) => {
    if(typeof invoice.Amount === 'string'){
      let tempValue = invoice.Amount.replace(',', '.');
      invoice.Amount = Number(tempValue);
    }
    let allInvoices = this.state.invoices;
    if(invoice.Id){
     for (let i = 0; i < allInvoices.length; i++) {
      if(allInvoices[i].Id === invoice.Id){
        allInvoices[i] = invoice;
      }
    }
    this.setState({
      invoices: allInvoices,
      editInvoice: {}
    }, () => this.recalculateInfo())
    }else{
      let invoices = [...this.state.invoices,invoice];
      this.setState({
        invoices: invoices,
        editInvoice: {}
      }, () => this.recalculateInfo())
    }
  }

  deleteInvoice = (index) => {
    let tempInvoices = this.state.invoices.splice(index, 1);
    this.setState({
      invoices: tempInvoices
    }, () => this.recalculateInfo())
  }

  openEditForm = (index) => {
    this.setState({
      editInvoice: this.state.invoices[index]
    })
    let form = document.querySelector(".form-division");
    if (form.classList.value === "form-division") {
      form.classList.value = "form-division active";
    }
  }

  recalculateInfo = () => {
    console.log('Calculate here');
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            InvoiceApp
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active" name="invoices">
              <a
                className="nav-link"
                name="invoices"
                onClick={(e) => this.showView(e)}
                href="invoices"
              >
                Invoices <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item" name="companies">
              <a
                className="nav-link"
                name="companies"
                onClick={(e) => this.showView(e)}
                href="companies"
              >
                Companies
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="view invoices" name="invoices">
                <ListOfInfo sumInvoice={this.state.sumInvoice} sumAmounts={this.state.sumAmounts}/>
                <Invoice companies={this.state.companies} saveInvoice={(invoice) => this.saveInvoice(invoice)} editInvoice={this.state.editInvoice} />
                <InvoiceTable invoices={this.state.invoices} deleteInvoice={(index) => this.deleteInvoice(index)} openEditForm={(invoice) => this.openEditForm(invoice)} />
              </div>
              <div className="view companies" name="companies">
                <h2>Companies</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
