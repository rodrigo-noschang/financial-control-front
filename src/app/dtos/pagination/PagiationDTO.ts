export interface IPaginationDTO {
	has_next_page: boolean;
	has_previous_page: boolean;
	total: number;
	page: number;
	page_size: number;
}
