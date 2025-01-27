import Loader from "../components/Loader";
import NoDataMassage from "../components/NoDataMessage";
import { io } from "socket.io-client";
import {
  useAppointmentsQuery,
  useCancelAppointmentMutation,
} from "../store/api/pet-api";
import { useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";

const socket = io("http://localhost:8000", {});

const MyAppointments = () => {
  const { data: appointments, isLoading, refetch } = useAppointmentsQuery();
  const [cancelAppointment] = useCancelAppointmentMutation();

  useEffect(() => {
    socket.on("appointmentUpdatedOnDisconnect", () => {
      refetch();
    });
    socket.on("appointmentUpdatedOnConnect", () => {
      refetch();
    });
  }, [refetch]);

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointment(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!appointments || appointments.length === 0) {
    return <NoDataMassage message={<>No more appointments to show!</>} />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "2rem",
          marginTop: "0.5rem",
        }}
      >
        {appointments.map((appointment) => {
          return (
            <AppointmentCard
              appointmentId={appointment.id}
              doctorId={appointment.appointmentToDoctor.userAsDoctor.id}
              key={appointment.id}
              doctorImage={appointment.vetImage}
              petImage={appointment.petImage}
              doctorName={`${appointment.appointmentToDoctor.userAsDoctor.firstName} ${appointment.appointmentToDoctor.userAsDoctor.lastName}`}
              petName={appointment.appointmentToPet.petName}
              time={`${appointment.appointmentToDoctor.DoctorShedule[0].availableTimeFrom} - ${appointment.appointmentToDoctor.DoctorShedule[0].availableTimeTo}`}
              day={appointment.appointmentDay}
              canleAppointment={() => handleCancel(appointment.id)}
              canceled={appointment.isCanceled}
              isJoined={appointment.canJoin}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyAppointments;
