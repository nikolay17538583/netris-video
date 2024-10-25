import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import eventsReducer from "./eventsSlice";
import eventsSaga from "./eventsSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(eventsSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
