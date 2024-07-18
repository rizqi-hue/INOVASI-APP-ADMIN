"use client";

import LatestPost from "./LatestPost";

const Sidebar = () => {
	return (
		<>
			<div className="space-y-[30px] md:space-y-[40px] 2xl:pl-[45px]">
				<LatestPost />

				{/* <Categories /> */}

				{/* <Tags /> */}
			</div>
		</>
	);
};

export default Sidebar;
