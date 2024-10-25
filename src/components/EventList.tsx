import { EventData } from "../redux/eventTypes";
import { formatTimestamp } from "../utils/formatTimestamp";

interface EventListProps {
  events: EventData[];
  onEventClick: (timestamp: number) => void;
}

export default function EventList({
  events,
  onEventClick,
}: EventListProps): React.ReactElement {
  return (
    <div className="overflow-y-auto h-full p-4">
      {events.map((event, index) => (
        <div
          key={index}
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onEventClick(event.timestamp)}
        >
          {formatTimestamp(event.timestamp)}
        </div>
      ))}
    </div>
  );
}
