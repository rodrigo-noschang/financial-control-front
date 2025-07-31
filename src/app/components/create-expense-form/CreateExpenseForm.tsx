import { useQuery } from "@tanstack/react-query";
import { TextInput } from "../text-input/TextInput";
import { listCategoriesHttp } from "@/app/http/categories/listCategories";
import { ICategoryDTO } from "@/app/dtos/categories/CategoryDTO";
import { GenericCombobox } from "../generic-combobox/GenericCombobox";
import { IOptionsDTO } from "@/app/dtos/options/OptionsDTO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseSchema } from "@/app/schemas/CreateExpenseSchema";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

export function CreateExpenseForm() {
	const form = useForm({
		resolver: zodResolver(createExpenseSchema),
	});

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

	console.log("form - ", form.watch("category_id"));

	return (
		<Form {...form}>
			<form>
				<div className="text-page-title"> Nova despesa </div>

				<div className="flex justify-between items-center">
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
						<TextInput label="Quantia" required placeholder="R$ 110,00" />
					</div>
				</div>
			</form>
		</Form>
	);
}
