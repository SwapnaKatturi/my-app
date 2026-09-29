import { Expense } from "./types";

const SEED_DATA: Expense[] = [
    { id: 1, title: 'Uber', amount: 75, type: 'out', description: 'Uber to SFO', date: '04/18/2018' },
    { id: 2, title: 'Uber', amount: 100, type: 'out', description: 'Uber to San Jose', date: '05/18/2014' },
    { id: 3, title: 'Meals', amount: 150, type: 'out', description: 'Dinner with customer', date: '04/18/2015' },
    { id: 4, title: 'Flight', amount: 1200, type: 'in', description: 'SFO to New Delhi', date: '04/18/2014' },
    { id: 5, title: 'Miscellaneous', amount: 55, type: 'in', description: 'Other expenses', date: '12/18/2018' },
    { id: 6, title: 'Audit', amount: 15000, type: 'out', description: 'Audit expenses for department', date: '01/18/2010' },
    { id: 7, title: 'Exhibition', amount: 450, type: 'in', description: 'Posters and other', date: '11/18/2011' },
    { id: 8, title: 'Insurance', amount: 1700, type: 'in', description: 'Travel insurance', date: '04/18/2008' },
    { id: 9, title: 'Rent', amount: 134000, type: 'in', description: 'Annual rent for office', date: '01/18/2015' },
    { id: 10, title: 'Utilities', amount: 900, type: 'in', description: 'Monthly utility bill for March', date: '06/18/2009' },
    { id: 11, title: 'Uber', amount: 60, type: 'out', description: 'Uber to airport', date: '02/12/2016' },
    { id: 12, title: 'Meals', amount: 200, type: 'out', description: 'Team lunch', date: '03/22/2017' },
    { id: 13, title: 'Flight', amount: 950, type: 'in', description: 'NYC to SFO', date: '07/09/2013' },
    { id: 14, title: 'Miscellaneous', amount: 30, type: 'in', description: 'Office supplies', date: '09/14/2012' },
    { id: 15, title: 'Audit', amount: 8000, type: 'out', description: 'External audit fees', date: '10/05/2011' },
    { id: 16, title: 'Exhibition', amount: 620, type: 'in', description: 'Booth rental', date: '06/30/2019' },
    { id: 17, title: 'Insurance', amount: 2100, type: 'in', description: 'Equipment insurance', date: '08/17/2020' },
    { id: 18, title: 'Rent', amount: 12000, type: 'out', description: 'Warehouse rent', date: '01/01/2021' },
    { id: 19, title: 'Utilities', amount: 400, type: 'out', description: 'Internet bill', date: '02/28/2022' },
    { id: 20, title: 'Uber', amount: 85, type: 'out', description: 'Uber to client site', date: '03/15/2023' },
    { id: 21, title: 'Meals', amount: 120, type: 'out', description: 'Client dinner', date: '04/10/2018' },
    { id: 22, title: 'Flight', amount: 1100, type: 'in', description: 'SFO to Austin', date: '05/05/2019' },
    { id: 23, title: 'Miscellaneous', amount: 45, type: 'in', description: 'Printer paper', date: '06/06/2020' },
    { id: 24, title: 'Audit', amount: 9500, type: 'out', description: 'Internal audit', date: '07/07/2021' },
];

export async function fetchExpensesApi(params:
    {
        page: number;
        pageSize: number;
        startPrice?: number;
        endPrice?: number;
        startDate?: string;
        endDate?: string;
    }
): Promise<{ data: Expense[], total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filtered: Expense[] = SEED_DATA.filter((item) => {
        if (params.startPrice && item.amount <= params.startPrice) {
            return false;
        }
        if (params.endPrice && item.amount >= params.endPrice) {
            return false;
        }
        if (params.startDate && new Date(item.date) < new Date(params.startDate)) {
            return false;
        }
        if (params.endDate && new Date(item.date) > new Date(params.endDate)) {
            return false;
        }
        return true;
    })

    const startIndex = (params.page - 1) * params.pageSize;

    const endIndex = startIndex + params.pageSize;

    const data = filtered.slice(startIndex, endIndex)
    return { data, total: filtered.length };

}

export async function deleteExpenseApi(id: number): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = SEED_DATA.findIndex((item) => item.id === id);
    if (index !== -1) {
        SEED_DATA.splice(index, 1);
    }
    return { success: true };
}

