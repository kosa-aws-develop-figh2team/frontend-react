import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

// 메인 컬러
const MAIN_COLOR = "#6D4FC2";

function ChatForm({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="메시지를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
        sx={{
          background: "#fff",
          borderRadius: 1.5,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: MAIN_COLOR,
            },
            "&:hover fieldset": {
              borderColor: MAIN_COLOR,
            },
            "&.Mui-focused fieldset": {
              borderColor: MAIN_COLOR,
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          minWidth: 70,
          height: 55,
          background: MAIN_COLOR,
          borderRadius: 1.5,
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            background: "#5940a9",
          },
        }}
        disableElevation
      >
        전송
      </Button>
    </Box>
  );
}

export default ChatForm;
