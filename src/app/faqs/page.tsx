"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
export default function FaqsPage() {
	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

	return (
		<div className="justify-center px-12">
			<h1 className="text-4xl font-bold capitalize">
				frequently asked questions
			</h1>
			<div className="my-5">
				This FAQ page provides detailed answers to common questions about
				Kanban, a visual project management methodology. Whether you&apos;re new
				to Kanban or looking to deepen your understanding, these FAQs cover the
				essentials and offer insights to help you effectively implement and
				benefit from Kanban in your projects.
			</div>
			<div className="my-5">
				<Accordion variant="splitted">
					<AccordionItem
						key="1"
						aria-label="Accordion 1"
						title="What is Kanban and how does it work?"
					>
						<span className="block my-2">
							Kanban is an agile project management methodology that uses a
							visual system to manage work as it moves through a process.
							Originating from lean manufacturing, Kanban has been widely
							adapted in software development and other industries.
						</span>
						<span className="block my-2">
							It works by using a Kanban board, divided into columns
							representing different stages of the workflow. Tasks or work items
							are represented by cards (digital or physical post-its) that move
							from one column to another as they progress. The goal is to
							visualize work, limit work in progress (WIP), and maximize
							workflow efficiency.
						</span>
						<span className="block my-2">Key features of Kanban include:</span>
						<ul className="list-disc pl-10 pb-4">
							<li className="list-item">
								Visualization of work: Using cards and columns to represent
								tasks and stages.
							</li>
							<li className="list-item">
								Work in progress limits: Setting limits on the number of tasks
								in each stage to prevent overload.
							</li>
							<li className="list-item">
								Flow management: Monitoring and optimizing workflow to identify
								and eliminate bottlenecks.
							</li>
							<li className="list-item">
								Continuous improvement: Regularly reviewing and adjusting the
								process to enhance efficiency.
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem
						key="2"
						aria-label="Accordion 2"
						title="What are the benefits of using Kanban?"
					>
						<span className="block my-2">
							Implementing Kanban offers several significant benefits for teams
							and organizations:
						</span>
						<ul className="list-disc pl-10 pb-4">
							<li className="list-item">
								Transparency and visibility: Provides a clear view of all tasks
								and their current status, facilitating problem identification
								and informed decision-making.
							</li>
							<li className="list-item">
								Flexibility: Kanban is highly adaptable and can be integrated
								with other agile or traditional methods. It doesn&apos;t require
								extensive upfront planning and allows continuous changes.
							</li>
							<li className="list-item">
								Reduced cycle time: By limiting work in progress and focusing on
								task completion, Kanban can significantly reduce the time needed
								to complete projects.
							</li>
							<li className="list-item">
								Continuous improvement: Encourages a culture of constant review
								and adjustment of the process, leading to ongoing improvements
								in efficiency and quality.
							</li>
							<li className="list-item">
								Increased productivity: By avoiding work overload and focusing
								on specific tasks, teams can work more efficiently and
								productively.
							</li>
							<li className="list-item">
								Early problem detection: Facilitates quick identification of
								bottlenecks and issues in the workflow, allowing timely
								corrective actions.
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem
						key="3"
						aria-label="Accordion 3"
						title="What are work in progress (WIP) limits and why are they important?"
					>
						<div className="">
							<span className="block my-2">
								Work in progress (WIP) limits are restrictions on the number of
								tasks or work items that can be in progress at any stage of the
								workflow simultaneously. These limits are a crucial part of
								Kanban and serve several important purposes:
							</span>
							<ul className="list-disc pl-10 pb-4">
								<li>
									Preventing overload: By limiting the number of tasks at each
									stage, teams avoid becoming overwhelmed, which can lead to
									reduced work quality and increased stress.
								</li>
								<li>
									Improving focus: WIP limits force teams to concentrate on
									completing tasks before starting new ones, enhancing focus and
									efficiency.
								</li>
								<li>
									Identifying bottlenecks: When WIP limits are reached, it
									signals a potential problem at that stage of the process,
									allowing early intervention to resolve it.
								</li>
								<li>
									Accelerating workflow: By limiting WIP, tasks are completed
									more quickly, reducing cycle time and improving value delivery
									to customers.
								</li>
							</ul>
						</div>
					</AccordionItem>
					<AccordionItem
						key="4"
						aria-label="Accordion 4"
						title="How do you implement a Kanban board?"
					>
						<span className="block my-2">
							Implementing a Kanban board involves several key steps:
						</span>
						<ul className="list-outside pb-4">
							<li className="list-item">
								Define workflow stages: Identify and name the different phases
								that tasks go through in your process (e.g., &ldquo;To
								Do,&ldquo; &ldquo;In Progress,&ldquo; &ldquo;Review,&ldquo;
								&ldquo;Done&ldquo;).
							</li>
							<li className="list-item">
								Create columns on the board: Each stage of the workflow is
								represented by a column on the Kanban board.
							</li>
							<li className="list-item">
								Add cards: Each task or work item is represented by a card.
								Cards should contain enough information for any team member to
								understand the task.
							</li>
							<li className="list-item">
								Set WIP limits: Define work in progress limits for each column
								to avoid overload and improve focus.
							</li>
							<li className="list-item">
								Move cards: As tasks progress, cards move from one column to
								another. This provides a clear visualization of work progress.
							</li>
							<li className="list-item">
								Review and adjust: Regularly review the workflow and WIP limits
								to identify areas for improvement and make necessary
								adjustments.
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem
						key="5"
						aria-label="Accordion 5"
						title="What is the difference between Kanban and Scrum?"
					>
						<span className="block my-2">
							While both are agile methods, Kanban and Scrum have key
							differences:
						</span>
						<ul className="list-disc pl-10 pb-4">
							<li className="list-item">
								Structure: Scrum is based on sprints (fixed time intervals,
								usually 2-4 weeks) during which a set of planned tasks must be
								completed. Kanban, on the other hand, has no sprints; tasks are
								completed continuously.
							</li>
							<li className="list-item">
								Roles: Scrum defines specific roles such as Scrum Master,
								Product Owner, and Development Team. Kanban does not have
								predefined roles and is more flexible regarding team
								responsibilities.
							</li>
							<li className="list-item">
								Planning: In Scrum, planning is done at the beginning of each
								sprint. Kanban does not require extensive upfront planning and
								allows continuous addition of tasks.
							</li>
							<li className="list-item">
								Deliveries: Scrum generally has deliveries at the end of each
								sprint, while Kanban allows continuous and more frequent
								deliveries as tasks are completed.
							</li>
							<li className="list-item">
								Continuous improvement: Both methods emphasize continuous
								improvement, but Kanban does so through ongoing review and
								adjustment of the workflow, while Scrum does it through
								retrospectives at the end of each sprint.
							</li>
						</ul>
					</AccordionItem>
					<AccordionItem
						key="6"
						aria-label="Accordion 6"
						title="How do you measure the success of a team using Kanban?"
					>
						<span className="block my-2">
							Measuring the success of a team using Kanban involves tracking
							several key performance indicators (KPIs):
						</span>
						<ul className="list-disc pl-10 pb-4">
							<li className="list-item">
								Cycle time: The time it takes for a task to move through all
								stages of the workflow, from start to finish. Reduced cycle time
								indicates efficient workflow.
							</li>
							<li className="list-item">
								Throughput: The amount of work completed in a given time period.
								Although not as prominent as in Scrum, it provides insight into
								the team&apos;s capacity.
							</li>
							<li className="list-item">
								Completion rate: The proportion of tasks completed relative to
								those started. A high completion rate suggests good workflow
								management.
							</li>
							<li className="list-item">
								Work in progress: The number of tasks at each stage of the
								workflow. Monitoring this helps maintain WIP limits and identify
								bottlenecks.
							</li>
							<li className="list-item">
								Bottlenecks: Identifying areas where tasks accumulate and do not
								progress. Addressing these bottlenecks improves overall
								efficiency.
							</li>
							<li className="list-item">
								Team and customer satisfaction: Regular surveys and feedback
								from the team and customers provide qualitative measures of
								success and the perception of delivered value.
							</li>
						</ul>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
