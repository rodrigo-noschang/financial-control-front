"use client";

import { useQuery } from "@tanstack/react-query";
import { MonthSummary } from "../components/months-summary";
import { MonthsSummaryTitle } from "../components/months-summary/MonthsSummaryTitle";
import { getExpensesSummaryHttp } from "../http/expenses/getExpensesSummary";
import { IExpensesSummaryDTO } from "../dtos/expenses/ExpensesSummaryDTO";
import { endOfMonth, setHours, startOfMonth, subMonths } from "date-fns";

export function FinancialData() {
	const inFocusDate = new Date();
	const previousDate = subMonths(new Date(), 1);

	const {
		data: focusMonthsExpensesSummary,
		// isLoading,
		// isFetching,
	} = useQuery<IExpensesSummaryDTO>({
		queryKey: ["get-current-expenses-summary"],
		queryFn: () =>
			getExpensesSummaryHttp({
				startDate: setHours(startOfMonth(inFocusDate), 12),
				endDate: setHours(endOfMonth(inFocusDate), 12),
			}),
		placeholderData: (prev) => prev,
	});

	const focusMonthsEssentials = focusMonthsExpensesSummary?.essentials ?? 0;
	const focusMonthsRest = focusMonthsExpensesSummary?.rest ?? 0;
	const focusMonthsTotal = focusMonthsExpensesSummary?.total ?? 0;

	const { data: previousMonthExpensesSummary } = useQuery<IExpensesSummaryDTO>({
		queryKey: ["get-previous-expenses-summary"],
		queryFn: () =>
			getExpensesSummaryHttp({
				startDate: setHours(startOfMonth(previousDate), 12),
				endDate: setHours(endOfMonth(previousDate), 12),
			}),
		placeholderData: (prev) => prev,
	});

	const previousMonthsEssentials =
		previousMonthExpensesSummary?.essentials ?? 0;
	const previousMonthsRest = previousMonthExpensesSummary?.rest ?? 0;
	const previousMonthsTotal = previousMonthExpensesSummary?.total ?? 0;

	return (
		<div className="flex justify-center">
			<div className="grow max-w-[1200px] mt-20">
				<div className="flex justify-between">
					<MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle date={inFocusDate} reference="current" />
							<MonthSummary.DatePicker />
						</MonthSummary.Header>

						<MonthSummary.Values
							essentials={focusMonthsEssentials}
							rest={focusMonthsRest}
							total={focusMonthsTotal}
						/>
					</MonthSummary.Root>

					<MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle date={previousDate} reference="previous" />
						</MonthSummary.Header>

						<MonthSummary.Values
							essentials={previousMonthsEssentials}
							rest={previousMonthsRest}
							total={previousMonthsTotal}
						/>
					</MonthSummary.Root>
				</div>
			</div>
		</div>
	);
}
