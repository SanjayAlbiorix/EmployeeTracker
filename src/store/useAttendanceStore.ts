import { create } from 'zustand';
import { Attendance } from '../types/models';
import { mockAttendance } from '../data/mockData';

interface AttendanceState {
  attendance: Attendance[];
  markPresent: (employeeId: string, date: string) => void;
  markAbsent: (employeeId: string, date: string) => void;
  markLate: (employeeId: string, date: string) => void;
  getAttendanceByDate: (date: string) => Attendance[];
  getAttendanceByEmployee: (employeeId: string) => Attendance[];
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  attendance: mockAttendance,
  markPresent: (employeeId, date) => {
    const existing = get().attendance.find(
      (a) => a.employeeId === employeeId && a.date === date
    );
    if (existing) {
      set((state) => ({
        attendance: state.attendance.map((a) =>
          a.id === existing.id
            ? { ...a, status: 'present' as const, checkIn: '09:00' }
            : a
        ),
      }));
    } else {
      const newAttendance: Attendance = {
        id: Date.now().toString(),
        employeeId,
        date,
        status: 'present',
        checkIn: '09:00',
        checkOut: '18:00',
      };
      set((state) => ({
        attendance: [...state.attendance, newAttendance],
      }));
    }
  },
  markAbsent: (employeeId, date) => {
    const existing = get().attendance.find(
      (a) => a.employeeId === employeeId && a.date === date
    );
    if (existing) {
      set((state) => ({
        attendance: state.attendance.map((a) =>
          a.id === existing.id
            ? { ...a, status: 'absent' as const, checkIn: undefined, checkOut: undefined }
            : a
        ),
      }));
    } else {
      const newAttendance: Attendance = {
        id: Date.now().toString(),
        employeeId,
        date,
        status: 'absent',
      };
      set((state) => ({
        attendance: [...state.attendance, newAttendance],
      }));
    }
  },
  markLate: (employeeId, date) => {
    const existing = get().attendance.find(
      (a) => a.employeeId === employeeId && a.date === date
    );
    if (existing) {
      set((state) => ({
        attendance: state.attendance.map((a) =>
          a.id === existing.id
            ? { ...a, status: 'late' as const, checkIn: '09:30' }
            : a
        ),
      }));
    } else {
      const newAttendance: Attendance = {
        id: Date.now().toString(),
        employeeId,
        date,
        status: 'late',
        checkIn: '09:30',
        checkOut: '18:00',
      };
      set((state) => ({
        attendance: [...state.attendance, newAttendance],
      }));
    }
  },
  getAttendanceByDate: (date) => {
    return get().attendance.filter((a) => a.date === date);
  },
  getAttendanceByEmployee: (employeeId) => {
    return get().attendance.filter((a) => a.employeeId === employeeId);
  },
}));

