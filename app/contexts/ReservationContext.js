"use client";

import { createContext, use, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext>
  );
}

function useReservation() {
  const context = use(ReservationContext);
  return context;
}

export { ReservationProvider, useReservation };
