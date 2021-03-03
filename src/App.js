import React, { Component } from "react";
import "./css/App.css";
import Invoice from "./components/Invoice";
import InvoiceTable from "./components/InvoiceTable";

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
        Title: "Racun za galapagos",
        Company: "Tim Sistems",
        DateOfInvoice: new Date(),
        Amount: 58800,
        InvoiceNumber: "06/2021",
        ForCompany: "Galapagos DOO",
        Description:
          "Usluge održavanja web aplikacije “My Obis”. Cena 2100.00. Ukupno 28h.",
        Files: {},
      },
      {
        Title: "Racun za Tim sistems",
        Company: "Galapagos DOO",
        DateOfInvoice: new Date(),
        Amount: 900000,
        InvoiceNumber: "07/2021",
        ForCompany: "Tim Sistems",
        Description: "Usluge održavanja web aplikacije.",
        Files: {},
      },
    ],
    sumAmounts: [{ Title: "Today", Amount: 58800 },{ Title: "This month", Amount: 58800 },{ Title: "This year", Amount: 0 },{ Title: "Last 365", Amount: 0 },{ Title: "Last year", Amount: 0 }],
    sumInvoice: [{ Title: "Today", Amount: 58800 },{ Title: "This month", Amount: 58800 },{ Title: "This year", Amount: 0 },{ Title: "Last 365", Amount: 0 },{ Title: "Last year", Amount: 0 }],
  };

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
                <Invoice />
                <InvoiceTable invoices={this.state.invoices} />
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
