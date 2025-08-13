"use client";

import { useQuery } from "@tanstack/react-query";
import { parseAsIsoDate, useQueryStates } from "nuqs";
import { addHours, endOfMonth, startOfDay, startOfMonth } from "date-fns";

import { GenericDialog } from "../components/generic-dialog/GenericDialog";
import { GenericButton } from "../components/generic-button/GenericButton";
import { MonthSummary } from "./FinancialData/months-summary";
import { ExpensesTable } from "./FinancialData/expenses-table/ExpensesTable";
import { MonthsSummaryTitle } from "./FinancialData/months-summary/MonthsSummaryTitle";
import { CreateExpenseForm } from "./FinancialData/create-expense-form/CreateExpenseForm";

import { IPaginationDTO } from "../dtos/pagination/PagiationDTO";
import { IExpensesSummaryDTO } from "../dtos/expenses/ExpensesSummaryDTO";
import { IListExpensesResponseDTO } from "../dtos/responses/ListExpensesResponseDTO";

import { listExpensesHttp } from "../http/expenses/listExpenses";
import { getExpensesSummaryHttp } from "../http/expenses/getExpensesSummary";

export function FinancialData() {
	const [paramRange] = useQueryStates(
		{
			from: parseAsIsoDate.withDefault(startOfMonth(new Date())),
			to: parseAsIsoDate.withDefault(startOfDay(endOfMonth(new Date()))),
		},
		{
			history: "push",
		}
	);

	const dateFrom = addHours(paramRange.from, 12);
	const dateTo = addHours(paramRange.to, 12);

	const {
		data: focusMonthsExpensesSummary,
		isLoading: isLoadingSummary,
		isFetching: isFetchingSummary,
	} = useQuery<IExpensesSummaryDTO>({
		queryKey: ["get-current-expenses-summary", dateFrom, dateTo],
		queryFn: () =>
			getExpensesSummaryHttp({
				startDate: dateFrom,
				endDate: dateTo,
			}),
		placeholderData: (prev) => prev,
	});

	const focusMonthsEssentials = focusMonthsExpensesSummary?.essentials ?? 0;
	const focusMonthsRest = focusMonthsExpensesSummary?.rest ?? 0;
	const focusMonthsTotal = focusMonthsExpensesSummary?.total ?? 0;

	const {
		data: listExpensesResponse,
		isLoading: isLoadingExpenses,
		isFetching: isRefetchingExpenses,
	} = useQuery<IListExpensesResponseDTO>({
		queryKey: ["list-expenses", dateFrom, dateTo],
		queryFn: () =>
			listExpensesHttp({
				startDate: dateFrom,
				endDate: dateTo,
			}),
		placeholderData: (prev) => prev,
	});

	const expenses = listExpensesResponse?.expenses ?? [];
	const paginationInfo =
		listExpensesResponse?.pagination ?? ({} as IPaginationDTO);

	return (
		<div className="flex justify-center">
			<div className="grow max-w-[1200px] mt-20 px-8">
				<div className="flex justify-center min-[500px]:justify-start">
					<MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle startDate={dateFrom} endDate={dateTo} />
							<MonthSummary.DatePicker
								key={`${dateFrom}_||_${dateTo}`}
								defaultFrom={dateFrom}
								defaultTo={dateTo}
								isLoading={isLoadingSummary || isFetchingSummary}
							/>
						</MonthSummary.Header>

						<MonthSummary.Values
							essentials={focusMonthsEssentials}
							rest={focusMonthsRest}
							total={focusMonthsTotal}
							isLoading={isLoadingSummary || isFetchingSummary}
						/>
					</MonthSummary.Root>
				</div>

				<div className="mt-20">
					<GenericDialog
						trigger={<GenericButton text="Criar despesa" />}
						content={<CreateExpenseForm dateFrom={dateFrom} dateTo={dateTo} />}
					/>
				</div>

				<div className="mt-20">
					<ExpensesTable
						expenses={expenses}
						paginationInfo={paginationInfo}
						isLoadingExpenses={isLoadingExpenses}
						isRefetchingExpenses={isRefetchingExpenses}
					/>
				</div>
			</div>
		</div>
	);
}
