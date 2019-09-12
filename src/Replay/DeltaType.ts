export enum DeltaType {
  DT_BYTE = 1,
  DT_SHORT = 1 << 1,
  DT_FLOAT = 1 << 2,
  DT_INTEGER = 1 << 3,
  DT_ANGLE = 1 << 4,
  DT_TIMEWINDOW_8 = 1 << 5,
  DT_TIMEWINDOW_BIG = 1 << 6,
  DT_STRING = 1 << 7,
  DT_SIGNED = 1 << 31
}
