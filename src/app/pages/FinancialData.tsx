"use client";

import { parseAsIsoDate, useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { addHours, endOfMonth, startOfDay, startOfMonth } from "date-fns";

import { MonthSummary } from "../components/months-summary";
import { MonthsSummaryTitle } from "../components/months-summary/MonthsSummaryTitle";

import { IExpensesSummaryDTO } from "../dtos/expenses/ExpensesSummaryDTO";
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
		isLoading,
		isFetching,
	} = useQuery<IExpensesSummaryDTO>({
		queryKey: ["get-current-expenses-summary", dateFrom, dateTo],
		queryFn: () => {
			return getExpensesSummaryHttp({
				startDate: dateFrom,
				endDate: dateTo,
			});
		},
		placeholderData: (prev) => prev,
	});

	const focusMonthsEssentials = focusMonthsExpensesSummary?.essentials ?? 0;
	const focusMonthsRest = focusMonthsExpensesSummary?.rest ?? 0;
	const focusMonthsTotal = focusMonthsExpensesSummary?.total ?? 0;

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
								isLoading={isLoading || isFetching}
							/>
						</MonthSummary.Header>

						<MonthSummary.Values
							essentials={focusMonthsEssentials}
							rest={focusMonthsRest}
							total={focusMonthsTotal}
							isLoading={isLoading || isFetching}
						/>
					</MonthSummary.Root>
				</div>
			</div>
		</div>
	);
}
