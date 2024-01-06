import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description}: R{expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
