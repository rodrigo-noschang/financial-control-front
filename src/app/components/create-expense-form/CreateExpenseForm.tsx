import { TextInput } from "../text-input/TextInput";

export function CreateExpenseForm() {
	return (
		// <Form>
		<form>
			<div className="text-page-title"> Nova despesa </div>

			<div>
				<div className="max-w-[300px]">
					<TextInput label="Despesa" required placeholder="Mercado" />
				</div>

				<div className="max-w-[200px]">
					<TextInput label="Quantia" required placeholder="R$ 110,00" />
				</div>
			</div>
		</form>
		// </Form>
	);
}
