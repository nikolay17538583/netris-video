import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./components/VideoPlayer";
import EventList from "./components/EventList";
import { fetchEventsRequest } from "./redux/eventsSlice";
import { RootState } from "./redux/store";

export default function App() {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const [seekTime, setSeekTime] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  const handleEventClick = (timestamp: number) => {
    setSeekTime(timestamp);
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4">
        <VideoPlayer seekTime={seekTime} onSeeked={() => setSeekTime(null)} />
      </div>
      <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">События</h2>
        <EventList events={events} onEventClick={handleEventClick} />
      </div>
    </div>
  );
}
