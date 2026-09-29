import { Component, ReactNode } from "react";
import { Expense } from "../features/expenses/types";

interface ExpenseDetailPanelProps {
    selectedExpense: Expense | null;
    savedNote: string;
    onSave: (expenseId: number, notes: string) => void;
}

interface ExpenseDetailPanelState {
    notes: string;
    selectedExpenseId: number | null;
}

class ExpenseDetailPanel extends Component<ExpenseDetailPanelProps, ExpenseDetailPanelState> {
    state: ExpenseDetailPanelState = {
        notes: '',
        selectedExpenseId: null
    }

    static getDerivedStateFromProps(props: ExpenseDetailPanelProps, state: ExpenseDetailPanelState) {
        const newId = props.selectedExpense?.id ?? null;
        if (newId !== state.selectedExpenseId) {
            return { selectedExpenseId: newId, notes: props.savedNote };
        }
        return null;
    }

    handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ notes: e.target.value });
    }

    handleSave = () => {
        if (this.props.selectedExpense) {
            this.props.onSave(this.props.selectedExpense.id, this.state.notes)
        }
    }

    handleCancel = () => {
        this.setState({ notes: this.props.savedNote });
    }

    render() {
        if (!this.props.selectedExpense) {
            return <p>Click a row to see details</p>
        }

        return (
            <div>
                <h4>{this.props.selectedExpense.title}</h4>
                <p>Amount: {this.props.selectedExpense.amount}</p>
                <textarea value={this.state.notes} onChange={this.handleNotesChange} placeholder="Add a note" />
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        )
    }
}

export default ExpenseDetailPanel;