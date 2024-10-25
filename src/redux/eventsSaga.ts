import { call, put, takeEvery } from "redux-saga/effects";
import { setEvents, fetchEventsRequest } from "./eventsSlice";
import { EventData } from "./eventTypes";

const fetchAnalyticsData = async () => {
  const response = await fetch("/api/XxfnKp");
  if (!response.ok) {
    throw new Error("Ошибочка");
  }
  return response.json();
};

function* handleFetchEvents() {
  try {
    const data: EventData[] = yield call(fetchAnalyticsData);
    yield put(setEvents(data));
  } catch (error) {
    console.error("Ошибочка", error);
  }
}

function* watchFetchEvents() {
  yield takeEvery(fetchEventsRequest.type, handleFetchEvents);
}

export default watchFetchEvents;
