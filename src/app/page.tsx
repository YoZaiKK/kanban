import { Boards, NewBoardFormModal } from "@/components";
import { LoginView } from "@/components/";
import { authOptions } from "@/lib/authOptions";
import { faArrowUpWideShort, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div>
				<LoginView />
			</div>
		);
	}
	return (
		<div className="justify-center px-12 ">
			<h1 className="text-4xl font-bold mb-4 flex justify-between items-center">
				Your boards
				<FontAwesomeIcon
					className="p-3 h-4 border-1  rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
					icon={faArrowUpWideShort}
				/>
			</h1>
			<div className="mt-4">
				<Link
					className="px-4 py-2 text-white  rounded-md inline-flex gap-2 w-full bg-customTeal shadow-md  hover:shadow-lg hover:bg-customTealDark transition-colors duration-200 ease-in-out items-center"
					href={"/new-board"}
				>
					<FontAwesomeIcon className="h-4 ml-3" icon={faPlus} />
					Create new board
				</Link>
				<NewBoardFormModal />
			</div>
			<Boards />
		</div>
	);
}
