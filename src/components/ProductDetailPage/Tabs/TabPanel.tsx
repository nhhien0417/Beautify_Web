import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  index: number;
  title: string;
  content: React.ReactNode;
}

const TabPanel = ({ index, title, content }: Props) => {
  const [hidden, setHidden] = useState(false);
  const toggleVisibility = () => setHidden((prev) => !prev);

  return (
    <Box
      id={`tabpanel-${index}`}
      sx={{
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{ color: "#333", whiteSpace: "nowrap" }}
        >
          {title}
        </Typography>
        <Divider sx={{ flexGrow: 1, borderBottomWidth: 1 }} />
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleVisibility}
          sx={{ whiteSpace: "nowrap" }}
        >
          {hidden ? "Show More" : "Hide"}
        </Button>
      </Box>
      {!hidden && content}
    </Box>
  );
};

export default TabPanel;
