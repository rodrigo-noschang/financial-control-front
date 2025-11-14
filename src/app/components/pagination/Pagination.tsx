import { cn } from "@/app/utils/cn";
import { useQueryState } from "nuqs";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { IPaginationDTO } from "@/app/dtos/pagination/PagiationDTO";

interface IProps {
	paginationInfo: IPaginationDTO;
}

export function Pagination({ paginationInfo }: IProps) {
	const [, setPageParam] = useQueryState("page");

	const { page, total, page_size } = paginationInfo;

	const pagesAmount = Math.ceil(total / page_size) || 1;

	const pages = (() => {
		const maxPagesToShow = 5;

		// If we have 5 or fewer pages, show all of them
		if (pagesAmount <= maxPagesToShow) {
			return Array.from({ length: pagesAmount }, (_, i) => i + 1);
		}

		// We have more than 5 pages, need to show a window of 5
		let startPage: number;
		let endPage: number;

		// If current page is near the beginning
		if (page <= 3) {
			startPage = 1;
			endPage = maxPagesToShow;
		}
		// If current page is near the end
		else if (page >= pagesAmount - 2) {
			startPage = pagesAmount - maxPagesToShow + 1;
			endPage = pagesAmount;
		}
		// Current page is in the middle
		else {
			startPage = page - 2;
			endPage = page + 2;
		}

		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		);
	})();

	function choosePage(page: string) {
		setPageParam(page);
	}

	function pageForward() {
		let nextPage = page + 1;

		if (nextPage > pagesAmount) {
			nextPage = pagesAmount;
		}

		setPageParam(nextPage.toString());
	}

	function pageBackward() {
		let previousPage = page - 1;

		if (previousPage < 1) {
			previousPage = 1;
		}

		setPageParam(previousPage.toString());
	}

	return (
		<div className="text-section-title flex items-center">
			<div
				onClick={pageBackward}
				className="w-[40px] h-[32px] flex justify-center items-center border-1 border-standard-color rounded-l-md hover:cursor-pointer hover:bg-box-bg"
			>
				<GoChevronLeft size={20} />
			</div>
			{pages.map((page) => (
				<div
					key={page}
					onClick={() => choosePage(page.toString())}
					className={cn(
						"w-[40px] h-[32px] text-center border-1 border-standard-color hover:cursor-pointer hover:bg-box-bg",
						page === paginationInfo.page && "bg-table-header"
					)}
				>
					{page}
				</div>
			))}
			<div
				onClick={pageForward}
				className="w-[40px] h-[32px] flex justify-center items-center border-1 border-standard-color rounded-r-md hover:cursor-pointer hover:bg-box-bg"
			>
				<GoChevronRight size={20} />
			</div>
		</div>
	);
}
