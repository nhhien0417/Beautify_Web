import React, { useState } from "react";
import { Typography, CardMedia, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SearchItemProps {
  id: number;
  image: string;
  title: string;
  price: number;
  type: "product" | "service";
}

export const SearchItem: React.FC<SearchItemProps> = ({
  image,
  title,
  price,
  type,
  id,
}) => {
  const navigate = useNavigate();
  const [, setIsClicked] = useState(false);

  const handleClick = () => {
    if (type === "product") {
      navigate(`/products/${id}`);
    } else if (type === "service") {
      navigate(`/services/${id}`);
    }
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  return (
    <Box
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        marginY: 0.5,
        cursor: "pointer",
        display: "block",
        width: "100%",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box sx={{ display: "flex", height: "65px" }}>
        <CardMedia
          component="img"
          sx={{ width: 65, borderRadius: 2 }}
          image={image}
          alt={title}
        />
        <CardContent
          sx={{
            flex: 1,
            p: 1,
          }}
        >
          <Typography fontSize={11} fontWeight="bold" alignItems="flex-start">
            {title}
          </Typography>
          <Typography fontSize={10} color="error" fontWeight="bold">
            ${price.toFixed(2)}
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
};

const SearchList = ({
  searchResults,
}: {
  searchResults: {
    id: number;
    name: string;
    image: string;
    price: number;
    type: string;
  }[];
}) => {
  const limitedSearchList = searchResults.slice(0, 3);
  return (
    <Box>
      {limitedSearchList.map((item, index) => (
        <SearchItem
          key={index}
          id={item.id}
          image={item.image}
          title={item.name}
          price={item.price}
          type={item.type as "product" | "service"}
        />
      ))}
    </Box>
  );
};

export default SearchList;
