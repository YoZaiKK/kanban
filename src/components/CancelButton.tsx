import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			onClick={onClick}
			className="w-full pt-2 mt-4 mb-4 gap-2 flex justify-center items-center capitalize text-sm  text-gray-400 hover:text-gray-600"
		>
			<FontAwesomeIcon icon={faClose} />
			Cancel
		</button>
	);
};
