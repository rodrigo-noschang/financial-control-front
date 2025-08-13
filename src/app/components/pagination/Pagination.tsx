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

	const pagesAmount = Math.ceil(total / page_size);

	const pages = (() => {
		const allPages = new Array(5).fill(0).map((_, index) => index + 1);

		const firstIndex = page <= 3 ? 0 : page - 1;

		let lastIndex = page >= pagesAmount - 3 ? pagesAmount : page;
		if (lastIndex < 5) {
			lastIndex = 5;
		}

		const shownPages = allPages.slice(firstIndex, lastIndex);
		return shownPages;
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
