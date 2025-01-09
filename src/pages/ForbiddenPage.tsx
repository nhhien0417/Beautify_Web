import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  // Game state
  const [player, setPlayer] = useState([0, 0]); // Player's position
  const [maze, setMaze] = useState<number[][]>([]); // Maze structure
  const [gameOver, setGameOver] = useState(false);

  // Initialize maze
  useEffect(() => {
    const generateMaze = () => {
      // More complex and challenging 20x20 maze (1 = wall, 0 = path)
      const mazeTemplate = [
        [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      setMaze(mazeTemplate);
    };

    generateMaze();
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const [x, y] = player;
      let newPlayer = [x, y];

      if (e.key === "ArrowUp" && x > 0 && maze[x - 1][y] === 0) {
        newPlayer = [x - 1, y];
      } else if (e.key === "ArrowDown" && x < 19 && maze[x + 1][y] === 0) {
        newPlayer = [x + 1, y];
      } else if (e.key === "ArrowLeft" && y > 0 && maze[x][y - 1] === 0) {
        newPlayer = [x, y - 1];
      } else if (e.key === "ArrowRight" && y < 19 && maze[x][y + 1] === 0) {
        newPlayer = [x, y + 1];
      }

      setPlayer(newPlayer);

      // Check if player reached the exit
      if (newPlayer[0] === 19 && newPlayer[1] === 19) {
        setGameOver(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [player, maze, gameOver]);

  const handleRestart = () => {
    setPlayer([0, 0]);
    setGameOver(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      bgcolor="#f7f8fa"
      textAlign="center"
      padding="20px"
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "96px", fontWeight: "bold", color: "#ff5722", mb: 2 }}
      >
        403
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, color: "#555" }}>
        Access Denied - Find your way out of the maze!
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 15px)",
          gridTemplateRows: "repeat(20, 15px)",
          gap: "2px",
          backgroundColor: "#ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              sx={{
                width: "15px",
                height: "15px",
                backgroundColor:
                  player[0] === rowIndex && player[1] === colIndex
                    ? "blue"
                    : cell === 1
                      ? "#333"
                      : rowIndex === 19 && colIndex === 19
                        ? "green"
                        : "#f7f8fa",
                border: "1px solid #ddd",
              }}
            />
          ))
        )}
      </Box>
      {gameOver ? (
        <Box mt={3}>
          <Typography variant="body1" sx={{ color: "#4caf50", mb: 2 }}>
            Congratulations! You've escaped the maze!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRestart}
            sx={{ ml: 2 }}
          >
            Restart
          </Button>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Use arrow keys to navigate the maze.
        </Typography>
      )}
    </Box>
  );
};

export default ForbiddenPage;
