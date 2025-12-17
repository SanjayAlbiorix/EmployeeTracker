import { create } from "zustand";
import { AttendanceRecord } from "../types";

type AttendanceState = {
  today: AttendanceRecord | null;
  clockIn: () => void;
  clockOut: () => void;
};

export const useAttendanceStore = create<AttendanceState>((set) => ({
  today: null,

  clockIn: () =>
    set({
      today: {
        id: "today",
        date: new Date().toISOString().split("T")[0],
        checkInTime: new Date().toLocaleTimeString(),
        status: "checked_in",
      },
    }),

  clockOut: () =>
    set((state) =>
      state.today
        ? {
            today: {
              ...state.today,
              checkOutTime: new Date().toLocaleTimeString(),
              status: "checked_out",
            },
          }
        : state
    ),
}));
