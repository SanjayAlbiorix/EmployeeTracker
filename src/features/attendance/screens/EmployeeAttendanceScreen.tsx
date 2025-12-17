import React from "react";
import { memo } from "react";

import ScreenContainer from "@/ui/layout/ScreenContainer";
import ClockCard from "../components/ClockCard";
import { useAttendanceStore } from "../store/attendanceStore";
import TopBar from "@/ui/layout/TopBar";

type Props = {};

const EmployeeAttendanceScreen: React.FC<Props> = () => {
  const { today, clockIn, clockOut } = useAttendanceStore();

  return (
    <ScreenContainer>
      <TopBar title="Attendance" showSidebarToggle />
      <ClockCard
        record={today}
        onClockIn={clockIn}
        onClockOut={clockOut}
      />
    </ScreenContainer>
  );
};

export default memo(EmployeeAttendanceScreen);
