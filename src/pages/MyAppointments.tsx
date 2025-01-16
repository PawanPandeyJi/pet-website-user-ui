import ConfirmCard from "../components/AppointmentCard";
import Loader from "../components/Loader";
import NoDataMassage from "../components/NoDataMessage";
import { useAppointmentsQuery, useCancelAppointmentMutation } from "../store/api/pet-api";

const MyAppointments = () => {
  const { data: appointments, isLoading } = useAppointmentsQuery();
  const [cancelAppointment] = useCancelAppointmentMutation();

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

  if ( !appointments || appointments.length === 0 ) {
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
        {appointments.map((val) => {
          return (
            <ConfirmCard
              key={val.id}
              doctorImage={val.vetImage}
              petImage={val.petImage}
              doctorName={`${val.appointmentToDoctor.userAsDoctor.firstName} ${val.appointmentToDoctor.userAsDoctor.lastName}`}
              petName={val.appointmentToPet.petName}
              time={`${val.appointmentToDoctor.DoctorShedule[0].availableTimeFrom} - ${val.appointmentToDoctor.DoctorShedule[0].availableTimeTo}`}
              day={val.appointmentDay}
              canleAppointment={() => handleCancel(val.id)}
              canceled={val.isCanceled}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyAppointments;
