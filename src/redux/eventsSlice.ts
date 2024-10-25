import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventData } from "./eventTypes";

interface EventsState {
  events: EventData[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<EventData[]>) {
      state.events = action.payload.sort((a, b) => a.timestamp - b.timestamp);
    },
    fetchEventsRequest() {},
  },
});

export const { setEvents, fetchEventsRequest } = eventsSlice.actions;
export default eventsSlice.reducer;
