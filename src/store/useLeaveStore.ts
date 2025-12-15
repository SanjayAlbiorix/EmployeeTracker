import { create } from 'zustand';
import { LeaveRequest } from '../types/models';
import { mockLeaveRequests } from '../data/mockData';

interface LeaveState {
  leaveRequests: LeaveRequest[];
  updateLeaveStatus: (id: string, status: LeaveRequest['status']) => void;
  getLeaveById: (id: string) => LeaveRequest | undefined;
}

export const useLeaveStore = create<LeaveState>((set, get) => ({
  leaveRequests: mockLeaveRequests,
  updateLeaveStatus: (id, status) => {
    set((state) => ({
      leaveRequests: state.leaveRequests.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      ),
    }));
  },
  getLeaveById: (id) => {
    return get().leaveRequests.find((leave) => leave.id === id);
  },
}));

