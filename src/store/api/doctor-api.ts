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
  DoctorShedule: doctorSheduleList[];
};
export type doctorSheduleList = {
  id: string;
  availableDays: string;
  availableTimeFrom: string;
  availableTimeTo: string;
  doctorId: string;
};

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user",
  }),
  endpoints: (builder) => ({
    Doctor: builder.query<Doctors[], void>({
      query: () => ({
        url: "/doctor",
        method: "GET",
      }),
    }),
  }),
});

export const { useDoctorQuery } = doctorApi;
