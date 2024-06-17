import { Accordion, AccordionItem } from "@nextui-org/react";
export default function FaqsPage() {
	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	return (
		<div>
			<h1 className="text-3xl font-bold">FAQs</h1>
			<div>Description</div>
			<div>
				<Accordion variant="splitted">
					<AccordionItem
						key="1"
						aria-label="Accordion 1"
						title="What is Kanban and how does it work?"
					>
						<span>
							Kanban is an agile project management methodology that uses a
							visual system to manage work as it moves through a process.
							Originating from lean manufacturing, Kanban has been widely
							adapted in software development and other industries.
						</span>
						<span>
							It works by using a Kanban board, divided into columns
							representing different stages of the workflow. Tasks or work items
							are represented by cards (digital or physical post-its) that move
							from one column to another as they progress. The goal is to
							visualize work, limit work in progress (WIP), and maximize
							workflow efficiency.
						</span>
						<span> Key features of Kanban include:</span>
						<ul>
							<li>
								Visualization of work: Using cards and columns to represent
								tasks and stages.
							</li>
							<li>
								Work in progress limits: Setting limits on the number of tasks
								in each stage to prevent overload.
							</li>
							<li>
								Flow management: Monitoring and optimizing workflow to identify
								and eliminate bottlenecks.
							</li>
							<li>
								Continuous improvement: Regularly reviewing and adjusting the
								process to enhance efficiency.
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
						{defaultContent}
					</AccordionItem>
					<AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
						{defaultContent}
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
