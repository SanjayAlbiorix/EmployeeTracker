import { create } from "zustand";
import { LeaveRecord, LeaveStatus, LeaveType } from "../types";

type LeaveState = {
  leaves: LeaveRecord[];
  requestLeave: (leave: Omit<LeaveRecord, "id" | "status" | "userId">) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
};

// Mock ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useLeaveStore = create<LeaveState>((set) => ({
  leaves: [],

  requestLeave: (leave) =>
    set((state) => ({
      leaves: [
        ...state.leaves,
        {
          ...leave,
          id: generateId(),
          userId: "current-user", // Mock user ID
          status: "pending",
        },
      ],
    })),

  approveLeave: (id) =>
    set((state) => ({
      leaves: state.leaves.map((leave) =>
        leave.id === id ? { ...leave, status: "approved" } : leave
      ),
    })),

  rejectLeave: (id) =>
    set((state) => ({
      leaves: state.leaves.map((leave) =>
        leave.id === id ? { ...leave, status: "rejected" } : leave
      ),
    })),
}));
