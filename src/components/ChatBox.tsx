import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState } from "react";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "../store/api/chat.ts";
import { useLoginUserDataQuery } from "../store/api/auth-api.ts";

type ModalFormProps = {
  doctorImage: string;
  doctorName: string;
  onClose?: () => void;
  roomId: string;
};

const ChatBox = (props: ModalFormProps) => {
  const [message, setMessage] = useState("");

  const { data: loginUserData } = useLoginUserDataQuery();
  const { data: messages } = useGetMessagesQuery(props.roomId, {
    skip: !props.roomId,
  });

  const [createMessageApi] = useCreateMessageMutation();

  const sendMessage = useCallback(async () => {
    if (!loginUserData?.id) return;

    await createMessageApi({
      message,
      senderId: loginUserData.id,
      roomId: props.roomId,
    }).unwrap();

    setMessage("");
  }, [createMessageApi, loginUserData?.id, message, props.roomId]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "500px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          p: 1,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={props.doctorImage}
            alt="User"
            sx={{ mr: 2, width: 48, height: 48 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {props.doctorName}
          </Typography>
        </Box>
        <IconButton
          onClick={props.onClose}
          aria-label="close"
          sx={{
            color: "#9e9e9e",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Message List */}
      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          p: 1,
        }}
      >
        {messages?.map((message) => {
          return (
            <ListItem sx={{ justifyContent: "flex-start" }}>
              <Box
                sx={{
                  bgcolor: "#f1f1f1",
                  p: 1,
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body2">{message.message}</Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>

      {/* Input and Send Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBox;
