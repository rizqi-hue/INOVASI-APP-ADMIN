"use client";

import { Link } from "react-router-dom";


const Categories = () => {
	return (
		<>
			<div>
				<h2 className="text-[22px] font-semibold text-black mb-[25px] pb-[10px] border-b border-[#E1E1E1]">
					Categories
				</h2>

				<div className="space-y-[15px]">
					<Link
						to="#"
						className="flex justify-between text-[#000] text-[16px] font-semibold hover:text-[#EF4335]"
					>
						Web Design
						<span>(05)</span>
					</Link>

					<Link
						to="#"
						className="flex justify-between text-[#000] text-[16px] font-semibold hover:text-[#EF4335]"
					>
						Branding
						<span>(02)</span>
					</Link>

					<Link
						to="#"
						className="flex justify-between text-[#000] text-[16px] font-semibold hover:text-[#EF4335]"
					>
						Digital Art
						<span>(05)</span>
					</Link>

					<Link
						to="#"
						className="flex justify-between text-[#000] text-[16px] font-semibold hover:text-[#EF4335]"
					>
						Graphics
						<span>(03)</span>
					</Link>

					<Link
						to="#"
						className="flex justify-between text-[#000] text-[16px] font-semibold hover:text-[#EF4335]"
					>
						Marketing
						<span>(04)</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Categories;
