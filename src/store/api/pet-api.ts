import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

type PetResponse = {
  id: string;
  petName: string;
  age: string;
  breed: string;
  weight: string;
  type: string;
  gender: string;
  color: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type RequestPetRegisterData = {
  petId: string;
  doctorId: string | undefined;
  userId: string;
  appointmentDay: string;
};

export type AppointmentResponse = {
  id: string;
  userId: string;
  doctorId: string;
  petId: string;
  appointmentDay: string;
  isCanceled: boolean;
  canJoin: boolean;
  isChatEnded: boolean;
  isPrescribed: boolean;
  appointmentToDoctor: {
    id: string;
    dob: string;
    gender: string;
    phone: string;
    qualification: string;
    specialization: string;
    licenseNumber: string;
    address: string;
    profileImage: string;
    certificateImage: string;
    isDeleted?: boolean;
    isApproved?: boolean;
    userId: string;
    userAsDoctor: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      type?: string;
    };
    DoctorShedule: [
      {
        availableTimeFrom: string;
        availableTimeTo: string;
      }
    ];
  };
  appointmentToPet: {
    id: string;
    petName: string;
    age: string;
    breed: string;
    weight: string;
    type: string;
    gender: string;
    color: string;
    image: string;
    isDeleted?: boolean;
    userId: string;
  };
  petImage: string;
  vetImage: string;
};

export type BackendError = {
  status: number;
  data: {
    message: string;
  };
};

export type AppointmentError = {
  status: number;
  data: {
    message: string;
  };
};

type CreatePet = {
  message: string;
  token?: string;
};

type MedicineResponse = {
  drugName: string;
  doseTime: string;
  frequency: string;
  dose: string;
  drugForm: string;
  duration: string;
};

type PrescriptionResponse = {
  id: string;
  diagnosis: string;
  remarks: string;
  appointmentId: string;
  createdAt: string;
  medicineOfPrescription: MedicineResponse[];
};

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["pet", "appointments"],
  endpoints: (builder) => ({
    createPets: builder.mutation<CreatePet, FormData>({
      query: (formData) => ({
        url: "/pet",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["pet"],
    }),

    getPets: builder.query<PetResponse[], void>({
      query: () => ({
        url: "/pet",
        method: "GET",
      }),
      providesTags: ["pet"],
    }),

    deletePet: builder.mutation<void, string>({
      query: (id) => ({
        url: `/pet/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["pet"],
    }),

    createAppointment: builder.mutation<AppointmentError, RequestPetRegisterData>({
      query: (appintmentForm) => ({
        url: "/appointment",
        method: "POST",
        body: appintmentForm,
      }),
      invalidatesTags: ["appointments"],
    }),

    cancelAppointment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["appointments"],
    }),

    appointments: builder.query<AppointmentResponse[], void>({
      query: () => ({
        url: "/appointments",
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    
    getPrescriptions: builder.query<PrescriptionResponse[], void>({
      query: () => ({
        url: "/userPrescription",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePetsMutation,
  useGetPetsQuery,
  useDeletePetMutation,
  useCreateAppointmentMutation,
  useAppointmentsQuery,
  useCancelAppointmentMutation,
  useGetPrescriptionsQuery
} = petApi;
