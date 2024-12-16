import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

type Doctors = {
  id: string;
  dob: string;
  gender: string;
  phone: string;
  qualification: string;
  specialization: string;
  licenseNumber: string;
  address: string;
  certificateImage: string;
  profileImage: string;
  isApproved: string;
  isDeleted: string;
  userId: string;
  DoctorShedule: doctorSheduleList[];
  userAsDoctor: DoctorName;
  createdAt: string;
  updatedAt: string;
};
export type doctorSheduleList = {
  id: string;
  availableDays: string[];
  availableTimeFrom: string;
  availableTimeTo: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
};

export type DoctorName = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    Doctor: builder.query<Doctors[], void>({
      query: () => ({
        url: "/doctors",
        method: "GET",
      }),
    }),
  }),
});

export const { useDoctorQuery } = doctorApi;
