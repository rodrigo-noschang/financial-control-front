import { useQuery } from "@tanstack/react-query";
import { listCategoriesHttp } from "@/app/http/categories/listCategories";
import { ICategoryDTO } from "@/app/dtos/categories/CategoryDTO";
import { GenericCombobox } from "../generic-combobox/GenericCombobox";
import { IOptionsDTO } from "@/app/dtos/options/OptionsDTO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CreateExpenseData,
	createExpenseSchema,
} from "@/app/schemas/CreateExpenseSchema";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { CurrencyInput } from "../currency-input/CurrencyInput";
import { GenericButton } from "../generic-button/GenericButton";
import { GenericPopover } from "../geneiric-popover/GenericPopover";
import { BsCalendar2Date } from "react-icons/bs";
import { CalendarInput } from "../calendar-input/CalendarInput";
import { format } from "date-fns";

export function CreateExpenseForm() {
	const form = useForm({
		resolver: zodResolver(createExpenseSchema),
		defaultValues: {
			amount: "0",
			expense_date: new Date(),
		},
	});

	console.log("errros - ", form.formState.errors);

	const { data: categories } = useQuery<ICategoryDTO[]>({
		queryKey: ["list-categories"],
		queryFn: listCategoriesHttp,
		placeholderData: (prev) => prev,
	});

	const categoriesOptions: IOptionsDTO[] =
		categories?.map((category) => {
			return {
				value: `${category.id}`,
				label: category.name,
			};
		}) ?? [];

	function handleCreateExpense(data: CreateExpenseData) {
		console.log("🚀 ~ handleCreateExpense ~ data:", data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleCreateExpense)}>
				<div className="text-page-title"> Nova despesa </div>

				<div className="flex justify-between items-center mt-8">
					<div className="max-w-[300px]">
						<FormField
							control={form.control}
							name="category_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<GenericCombobox
											options={categoriesOptions}
											inputPlaceholder="Pesquisar despesa..."
											triggerText="Selecione a despesa"
											emptyText="Nenhuma categoria encontrada"
											label="Despesa"
											formOnChange={field.onChange}
											value={field.value}
											required
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div className="max-w-[200px]">
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<CurrencyInput
											label="Quantia"
											value={field.value ?? "0"}
											formOnChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="border-t-1 border-t-light-border mt-8 pt-4">
					<div className="max-w-[300px]">
						<FormField
							control={form.control}
							name="expense_date"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<GenericPopover
											trigger={
												<div>
													<div> Data da despesa </div>
													<div className="border-1 border-standard-color flex items-center gap-4 py-2 px-3 mt-2 rounded-md cursor-pointer hover:bg-page-bg active:transform-[scale(0.95)] transition-[0.3s]">
														<BsCalendar2Date
															size={18}
															className="text-standard-color"
														/>

														<span className="text-standard-size text-standard-color">
															{format(field.value, "dd/MM/yyyy")}
														</span>
													</div>
												</div>
											}
										>
											<CalendarInput
												defaultDate={field.value}
												formOnChange={field.onChange}
											/>
										</GenericPopover>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="mt-10">
					<GenericButton text="Criar" type="submit" />
				</div>
			</form>
		</Form>
	);
}
