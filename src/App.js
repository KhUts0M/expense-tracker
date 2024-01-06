import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const expenseDate = e.target.elements.date.value;
    const amount = e.target.elements.expense.value;

    if (!name || !expenseDate || !amount) {
      alert("Please fill in all fields");
      return;
    }

    const date = new Date(expenseDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const inputDate = String(date.getDate()).padStart(2, "0");
    const outputDate = inputDate + "-" + month + "-" + year;

    setExpenses([
      ...expenses,
      { name, amount, date: outputDate, id: new Date().getTime() },
    ]);

    e.target.reset();
  };

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    // Update the checked state for all expenses
    setExpenses(expenses.map((expense) => ({ ...expense, checked })));
  };

  const handleDeleteSelected = () => {
    setExpenses(expenses.filter((expense) => !selectAll || !expense.checked));
    setSelectAll(false);
  };

  const handleCheckboxChange = (id) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, checked: !expense.checked } : expense
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value.toUpperCase());
  };

  const filteredExpenses = expenses.filter(
    (expense) => expense.name.toUpperCase().indexOf(searchFilter) > -1
  );

  return (
    <main className="main">
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          className="name"
          placeholder="Enter expense name"
          name="name"
        />
        <input
          type="number"
          className="amount"
          placeholder="Enter Amount"
          name="expense"
        />
        <input
          type="date"
          className="expenseDate"
          placeholder="dd-mm-yyyy"
          name="date"
        />

        <input type="submit" id="submitbtn" name="submit" value="Submit" />
      </form>
      <div className="row">
        <div className="selectOption">
          <div className="selectElement">
            <input
              type="checkbox"
              id="selectChecked"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label htmlFor="selectChecked">Select All</label>
          </div>
          <div className="deleteElement">
            <a className="deleteBtn" href="#" onClick={handleDeleteSelected}>
              Delete
            </a>
          </div>
        </div>
        <div className="searchBox">
          <input
            type="text"
            name="search"
            placeholder="Search Name..."
            className="searchName"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="expense-data">
          <tbody>
            <tr>
              <th></th>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  <input
                    type="checkbox"
                    id={`label-${expense.id}`}
                    checked={expense.checked || false}
                    onChange={() => handleCheckboxChange(expense.id)}
                  />
                  <label htmlFor={`label-${expense.id}`}></label>
                </td>
                <td>{expense.name}</td>
                <td>R{expense.amount}</td>
                <td>{expense.date}</td>
                <td>
                  <button
                    className="remove"
                    onClick={() => handleRemoveExpense(expense.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default App;
