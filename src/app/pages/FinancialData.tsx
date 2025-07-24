"use client";

import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { addHours, endOfMonth, format, startOfMonth } from "date-fns";

import { MonthSummary } from "../components/months-summary";
import { MonthsSummaryTitle } from "../components/months-summary/MonthsSummaryTitle";

import { IExpensesSummaryDTO } from "../dtos/expenses/ExpensesSummaryDTO";
import { getExpensesSummaryHttp } from "../http/expenses/getExpensesSummary";

export function FinancialData() {
	const [paramFrom] = useQueryState("from", {
		defaultValue: format(addHours(startOfMonth(new Date()), 12), "yyyy-MM-dd"),
	});
	const [paramTo] = useQueryState("to", {
		defaultValue: format(addHours(endOfMonth(new Date()), 12), "yyyy-MM-dd"),
	});

	const dateFrom = addHours(paramFrom, 12);
	const dateTo = addHours(paramTo, 12);

	const {
		data: focusMonthsExpensesSummary,
		isLoading,
		isFetching,
	} = useQuery<IExpensesSummaryDTO>({
		queryKey: ["get-current-expenses-summary", paramFrom, paramTo],
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
			<div className="grow max-w-[1200px] mt-20">
				<div className="flex justify-between">
					<MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle startDate={dateFrom} endDate={dateTo} />
							<MonthSummary.DatePicker
								defaultFrom={paramFrom}
								defaultTo={paramTo}
							/>
						</MonthSummary.Header>

						<MonthSummary.Values
							essentials={focusMonthsEssentials}
							rest={focusMonthsRest}
							total={focusMonthsTotal}
							isLoading={isLoading || isFetching}
						/>
					</MonthSummary.Root>

					{/* <MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle
								date={previousDate.from}
								reference="previous"
							/>
						</MonthSummary.Header>

						<MonthSummary.Values
							essentials={previousMonthsEssentials}
							rest={previousMonthsRest}
							total={previousMonthsTotal}
							isLoading={isLoading || isFetching}
						/>
					</MonthSummary.Root> */}
				</div>
			</div>
		</div>
	);
}
