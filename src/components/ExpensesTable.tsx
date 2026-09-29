import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Expense } from "../features/expenses/types";
import ExpenseDetailPanel from "./ExpenseDetailPanel";
import { fetchExpensesRequest, setFilters, setPage } from "../features/expenses/expensesSlice";
import ExpenseRow from "./ExpensesRow";

function ExpensesTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error, page, total, pageSize, startPrice: appliedStartPrice, endDate: appliedEndDate, endPrice: appliedEndPrice, startDate: appliedStartDate } = useSelector((state: RootState) => state.expenses);
    const [draftStartPrice, setDraftStartPrice] = useState('');
    const [draftEndPrice, setdraftEndPrice] = useState('');
    const [draftStartDate, setdraftStartDate] = useState('');
    const [draftEndDate, setdraftEndDate] = useState('');
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [savedNotes, setSavedNotes] = useState<Record<number, string>>({});

    const handleSelectedExpense = useCallback((expense: Expense) => {
        setSelectedExpense(expense);
    }, [])

    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {

        dispatch(fetchExpensesRequest())

    }, [dispatch, page, appliedEndDate, appliedEndPrice, appliedStartDate, appliedStartPrice])

    const handleClearFilter = () => {
        setDraftStartPrice('');
        setdraftStartDate('');
        setdraftEndDate('');
        setdraftEndPrice('');
        dispatch(setFilters({}));
    }

    const handleSavedNotes = useCallback((expenseId: number, notes: string) => {
        setSavedNotes((prev) => ({ ...prev, [expenseId]: notes }))
    }, []);

    const totalAmount = useMemo(() => {
        console.log('recalculating total amount...');
        return items.reduce((sum, item) =>
            sum = sum + item.amount
            , 0)
    }, [items])

    return (
        <div>
            {status === 'loading' && <p>Loading Data...</p>}
            {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}
            {status === 'succeeded' &&
                <>
                    <div>
                        <h3>Apply filters</h3>
                        <div>
                            <label>Start Price: </label>
                            <input value={draftStartPrice} onChange={(e) => setDraftStartPrice(e.target.value)} />
                        </div><br />
                        <div>
                            <label>End Price: </label>
                            <input value={draftEndPrice} onChange={(e) => setdraftEndPrice(e.target.value)} />
                        </div><br />
                        <div>
                            <label>Start Date: </label>
                            <input value={draftStartDate} onChange={(e) => setdraftStartDate(e.target.value)} />
                        </div><br />
                        <div>
                            <label>End Date: </label>
                            <input value={draftEndDate} onChange={(e) => setdraftEndDate(e.target.value)} />
                        </div><br />
                        <button onClick={() => dispatch(setFilters({ startDate: draftStartDate, endDate: draftEndDate, startPrice: Number(draftStartPrice), endPrice: Number(draftEndPrice) }))}>Apply filters</button>
                        <button onClick={handleClearFilter}>Clear Filters</button>
                    </div>

                    <p>Total: {totalAmount}</p>

                    <ExpenseDetailPanel selectedExpense={selectedExpense}
                        savedNote={selectedExpense ? savedNotes[selectedExpense.id] ?? '' : ''} onSave={handleSavedNotes}
                    />

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <ExpenseRow key={item.id} expense={item} onSelect={handleSelectedExpense} />
                            ))}
                        </tbody>
                    </table>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button key={pageNumber} onClick={() => dispatch(setPage(pageNumber))}>
                            {pageNumber}
                        </button>

                    ))}
                    <button onClick={() => dispatch(setPage(page + 1))} disabled={page >= totalPages}>Next</button>
                    <button onClick={() => dispatch(setPage(totalPages))} disabled={page === totalPages}>Last</button>
                </>
            }
        </div>

    )
}

export default ExpensesTable;