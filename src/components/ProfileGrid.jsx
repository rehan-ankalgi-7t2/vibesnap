import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProfileGrid = ({ items }) => {
	return (
		<Box sx={{ maxWidth: 1200, mx: "auto"}}>
			<Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
				{items.map((item, index) => (
					<Box
						key={index}
						sx={{
							borderRadius: "16px",
							overflow: "hidden",
							boxShadow: "0px 4px 6px rgba(0, 2, 8, 0.1)",
						}}
						className="bg-white"
					>
						<img
							src={item.media[0]}
							alt={item.content}
							loading="lazy"
							className="w-full h-auto"
						/>
						<Box className="p-2">
							<p>{item.likes}</p>
							<p className="text-sm text-gray-500">{item.content}</p>
						</Box>
					</Box>
				))}
			</Masonry>
		</Box>
	);
};

export default ProfileGrid;
