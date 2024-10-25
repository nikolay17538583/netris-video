export interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface EventData {
  timestamp: number;
  duration: number;
  zone: Zone;
}
