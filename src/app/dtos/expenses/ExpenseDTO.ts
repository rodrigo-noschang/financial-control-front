import { ICategoryDTO } from "../categories/CategoryDTO";

export interface IExpenseDTO {
	id: number;
	category_id: number;
	observation: string;
	amount: `${number}`;
	date: Date;
	essential: boolean;
	recurrent: boolean;
	has_installments: boolean;
	created_at: Date;
	updated_at: Date;
	category: ICategoryDTO;
}
