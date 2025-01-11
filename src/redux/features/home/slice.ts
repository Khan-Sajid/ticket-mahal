import { createSlice } from "@reduxjs/toolkit";
const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState: {
    banner: {},
    recommendedEvents: [],
    upcommingEvents: [],
    premiumEvents: [],
    pastEvents: [],
  },
  reducers: {},
});
export default eventsSlice.reducer;
