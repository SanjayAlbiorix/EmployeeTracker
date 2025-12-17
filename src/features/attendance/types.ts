export type AttendanceStatus = "checked_in" | "checked_out";

export type AttendanceRecord = {
  id: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: AttendanceStatus;
};
