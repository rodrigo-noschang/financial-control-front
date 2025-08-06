import { PuffLoader } from "react-spinners";

export function RefetchingShield() {
	return (
		<div className="absolute w-full h-full top-0 bg-loading-shield opacity-[0.85] flex justify-center items-center">
			<PuffLoader size={20} loading={true} color="#bbb" />
		</div>
	);
}
