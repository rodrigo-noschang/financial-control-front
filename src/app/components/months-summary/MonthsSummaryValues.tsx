export function MonthsSummaryValues() {
	return (
		<div className="flex items-center gap-16 mt-8">
			<div className="flex flex-col">
				<span className="text-essentials">Essenciais</span>
				<span className="font-bold"> R$ 1.230,60 </span>
			</div>

			<div className="flex flex-col">
				<span className="text-rest">Restôio</span>
				<span className="font-bold"> R$ 390,90 </span>
			</div>

			<div className="flex flex-col">
				<span>Total</span>
				<span className="font-bold"> R$ 1.621,50 </span>
			</div>
		</div>
	);
}
