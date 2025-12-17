export type LeaveType = "casual" | "sick" | "paid";

export type LeaveStatus = "pending" | "approved" | "rejected";

export type LeaveRecord = {
  id: string;
  userId: string; // To differentiate users (mock)
  type: LeaveType;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
};
