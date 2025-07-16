import { MonthSummary } from "../components/months-summary";
import { MonthsSummaryTitle } from "../components/months-summary/MonthsSummaryTitle";

export function FinancialData() {
	return (
		<div className="flex justify-center">
			<div className="grow max-w-[1200px] mt-20">
				<div className="flex justify-between">
					<MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle />
							<MonthSummary.DatePicker />
						</MonthSummary.Header>

						<MonthSummary.Values />
					</MonthSummary.Root>

					<MonthSummary.Root>
						<MonthSummary.Header>
							<MonthsSummaryTitle />
						</MonthSummary.Header>

						<MonthSummary.Values />
					</MonthSummary.Root>
				</div>
			</div>
		</div>
	);
}
