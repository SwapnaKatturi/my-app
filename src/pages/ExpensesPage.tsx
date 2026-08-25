import ErrorBoundary from "../components/ErrorBoundary";
import ExpensesTable from "../components/ExpensesTable";

function ExpensesPage() {
    return (
        <div>
            <h3>This is expenses page. Expenses table are displayed here</h3>
            <ErrorBoundary>

                <ExpensesTable />
            </ErrorBoundary>
        </div>
    )
}

export default ExpensesPage;