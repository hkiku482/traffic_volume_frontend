export type Result = {
  models: ByModel;
  time: ByTime;
};

export type ByModel = {
  model_name: string;
  traffic_volume: number;
}[];

export type ByTime = {
  time: string;
  traffic_volume: number;
}[];
