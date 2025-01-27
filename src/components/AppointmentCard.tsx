import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
  Tooltip,
  Modal,
} from "@mui/material";
import { VaccinesOutlined } from "@mui/icons-material";
import ChatBox from "./ChatBox";
import { useCallback,   useEffect,   useState } from "react";
import { useCreateRoomMutation, useGetRoomsQuery } from "../store/api/chat.ts";
import { useLoginUserDataQuery } from "../store/api/auth-api.ts";
import { io } from "socket.io-client";


const socket = io("http://localhost:8000", {});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 1,
};

type AppointmentDataProps = {
  doctorImage: string;
  doctorName: string;
  petImage: string;
  petName: string;
  time: string;
  day: string;
  canceled: boolean;
  isJoined: boolean;
  isChatEnded: boolean;
  canleAppointment: () => void;
  doctorId: string;
  appointmentId: string;
};

const AppointmentCard = (props: AppointmentDataProps) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [roomId, setRoomId] = useState<string>();

  
  const { data: loginUserData } = useLoginUserDataQuery();
  const { data: rooms, isLoading: isRoomsLoading,refetch } =
  useGetRoomsQuery(undefined);

  const [createRoomApi] = useCreateRoomMutation();

  const handleClose = () => setOpenChatBox(false);

  const joinAppointment = useCallback(async () => {
    if (!loginUserData?.id) return;
    if (isRoomsLoading) return;
    
    let currentRoomId;
  
    const previousRoom = rooms?.find(
      (room) => room.appointmentId === props.appointmentId
    );
  
    if (!previousRoom) {
      const room = await createRoomApi({
        participant: props.doctorId,
        appointmentId: props.appointmentId,
      }).unwrap();
      currentRoomId = room.id;
    } else {
      currentRoomId = previousRoom.id;
    }
  
    setRoomId(currentRoomId); 
    setOpenChatBox(true);
  }, [
    createRoomApi,
    isRoomsLoading,
    loginUserData?.id,
    props.appointmentId,
    props.doctorId,
    rooms,
  ]);

  useEffect(() => {
    const handleAskToJoin = () => refetch();
    socket.on("askToJoin", handleAskToJoin);
  
    return () => {
      socket.off("askToJoin", handleAskToJoin);
    };
  }, [refetch]);

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "1rem",
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        position: "relative",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        marginBottom={2}
      >
        <Avatar
          sx={{ bgcolor: "primary.main", height: 80, width: 80 }}
          src={props.doctorImage}
        />
        <VaccinesOutlined color="disabled" sx={{ height: 40, width: 40 }} />
        <Avatar
          sx={{ bgcolor: "secondary.main", height: 80, width: 80 }}
          src={props.petImage}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          Appointment Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Doctor: Dr. {props.doctorName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pet: {props.petName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Date: 2024-12-20
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Time: {props.time}, Day: {props.day}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {
            !props.isJoined && props.isChatEnded ? (
              <span style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}>
              <Button
                variant="contained"
                color="success"
                onClick={joinAppointment}
              >
                View Chat
              </Button>
            </span>
            ) : (
              <>
              <Button
              variant="outlined"
              color="error"
              onClick={props.canleAppointment}
              disabled={props.canceled}
            >
              Cancel
            </Button>
              <Tooltip
          title={
            !props.isJoined
              ? `You Can Join Chat on ${props.day}`
              : `You can join the chat`
          }
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={joinAppointment}
              disabled={!props.isJoined}
            >
              Join
            </Button>
          </span>
        </Tooltip>
        </>
            )
          }
      </CardActions>
      {props.canceled ? (
        <Typography
          variant="h3"
          color="error"
          sx={{
            position: "absolute",
            transform: "rotate(-40deg)",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: "0rem",
          }}
        >
          Canceled
        </Typography>
      ) : null}
      <div>
        <Modal open={openChatBox && !!roomId} onClose={handleClose}>
          <Box sx={style}>
            <ChatBox
              roomId={roomId ?? ""}
              onClose={() => setOpenChatBox(false)}
              doctorImage={props.doctorImage}
              doctorName={props.doctorName}
              isJoined={props.isJoined}
              isChatEnded={props.isChatEnded}
            />
          </Box>
        </Modal>
      </div>
    </Card>
  );
};

export default AppointmentCard;
