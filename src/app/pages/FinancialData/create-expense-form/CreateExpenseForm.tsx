import { useForm } from "react-hook-form";
import { format, subHours } from "date-fns";
import { BsCalendar2Date } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { GenericTextArea } from "../../../components/text-area/GenericTextArea";
import { CurrencyInput } from "../../../components/currency-input/CurrencyInput";
import { GenericButton } from "../../../components/generic-button/GenericButton";
import { CalendarInput } from "../../../components/calendar-input/CalendarInput";
import { GenericPopover } from "../../../components/generic-popover/GenericPopover";
import { GenericCombobox } from "../../../components/generic-combobox/GenericCombobox";
import { GenericCheckbox } from "../../../components/generic-checkbox/GenericCheckbox";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

import {
	CreateExpenseData,
	CreateExpenseHttpData,
	createExpenseSchema,
} from "@/app/schemas/expenses/CreateExpenseSchema";
import { IOptionsDTO } from "@/app/dtos/options/OptionsDTO";
import { ICategoryDTO } from "@/app/dtos/categories/CategoryDTO";
import { createExpenseHttp } from "@/app/http/expenses/createExpense";
import { listCategoriesHttp } from "@/app/http/categories/listCategories";
import { CloseDialogButton } from "../../../components/close-dialog-button/CloseDialogButton";
import toast from "react-hot-toast";

interface IProps {
	dateFrom: Date;
	dateTo: Date;
}

export function CreateExpenseForm({ dateFrom, dateTo }: IProps) {
	const form = useForm({
		resolver: zodResolver(createExpenseSchema),
		defaultValues: {
			amount: "0",
			date: new Date(),
			essential: false,
			recurrent: false,
			category_id: undefined,
			observation: "",
		},
	});

	const queryClient = useQueryClient();

	const { data: categories, isLoading: isLoadingCategories } = useQuery<
		ICategoryDTO[]
	>({
		queryKey: ["list-categories"],
		queryFn: listCategoriesHttp,
		placeholderData: (prev) => prev,
	});

	const { mutateAsync: createExpense, isPending: isCreatingExpense } =
		useMutation({
			mutationKey: ["create-expense"],
			mutationFn: createExpenseHttp,
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["list-expenses", dateFrom, dateTo],
				});

				queryClient.invalidateQueries({
					queryKey: ["get-current-expenses-summary", dateFrom, dateTo],
				});

				toast.success("Despesa cadastrada com sucesso");

				form.reset();
			},
		});

	const categoriesOptions: IOptionsDTO[] =
		categories?.map((category) => {
			return {
				value: `${category.id}`,
				label: category.name,
			};
		}) ?? [];

	function handleCreateExpense(data: CreateExpenseData) {
		const formattedData: CreateExpenseHttpData = {
			...data,
			category_id: Number(data.category_id),
			amount: Number(data.amount) / 100,
			date: subHours(data.date, 12),
		};

		return createExpense(formattedData);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleCreateExpense)}>
				<div className="text-page-title"> Nova despesa </div>

				<div className="flex justify-between items-start mt-10">
					<div className="max-w-[300px]">
						<FormField
							control={form.control}
							name="category_id"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormControl>
										<GenericCombobox
											options={categoriesOptions}
											isLoadingOptions={isLoadingCategories}
											inputPlaceholder="Pesquisar despesa..."
											triggerText="Selecione a despesa"
											emptyText="Nenhuma categoria encontrada"
											label="Despesa"
											formOnChange={field.onChange}
											value={field.value}
											required
											errorMessage={fieldState.error?.message}
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

				<div className="border-t-1 border-t-light-border mt-10 pt-10">
					<div className="max-w-[300px]">
						<FormField
							control={form.control}
							name="date"
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

				<div className="mt-10 flex items-center justify-between">
					<div className="max-w-[120px]">
						<FormField
							control={form.control}
							name="essential"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<GenericCheckbox
											id="essential"
											label="Essencial"
											checked={field.value}
											formOnChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<div className="max-w-[120px]">
						<FormField
							control={form.control}
							name="recurrent"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<GenericCheckbox
											id="recurrent"
											label="Recorrente"
											checked={field.value}
											formOnChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="border-t-1 border-t-light-border mt-10 pt-10">
					<FormField
						control={form.control}
						name="observation"
						render={({ field }) => (
							<GenericTextArea
								label="Descrição"
								value={field.value ?? undefined}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>

				<div className="mt-10 flex justify-between">
					<CloseDialogButton text="Fechar" isLoading={isCreatingExpense} />

					<GenericButton
						text="Criar"
						type="submit"
						isLoading={isCreatingExpense}
					/>
				</div>
			</form>
		</Form>
	);
}
