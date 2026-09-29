import { memo } from "react";
import { Expense } from "../features/expenses/types";
import { deleteExpenseRequest } from "../features/expenses/expensesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface ExpenseRowProps {
    expense: Expense;
    onSelect: (expense: Expense) => void;
}

function ExpenseRow({ expense, onSelect }: ExpenseRowProps) {
    const dispatch = useDispatch<AppDispatch>();
    console.log('Rendering row:' + expense.id);
    return (
        <tr >
            <td>{expense.id}</td>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{expense.type}</td>
            <td>{expense.description}</td>
            <td>{expense.date}</td>
            <td>
                <button onClick={() => dispatch(deleteExpenseRequest(expense.id))}>Delete</button>
                <button onClick={() => onSelect(expense)}>View</button>
            </td>
        </tr>
    )
}

export default memo(ExpenseRow);