import { CircularProgress, Grid } from "@mui/material";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ByModel, ByTime } from "../domains/result";

export const TrafficVolumeChart = (props: { locationAddress: string, models: ByModel, time: ByTime }): JSX.Element => {
  const modelData: number[] = []
  const modelLabel: string[] = []

  const timeData: number[] = []
  const timeLabel: string[] = []

  if (props.models.length === 0) {
    return <CircularProgress />
  }

  props.models.map((v) => {
    modelData.push(v.traffic_volume)
    modelLabel.push(v.model_name)
  })

  props.time.map((v) => {
    timeData.push(v.traffic_volume)
    timeLabel.push(v.time)
  })

  const modelChartData = {
    labels: modelLabel,
    datasets: [
      {
        data: modelData,
        label: '交通量',
        backgroundColor: 'rgba(53, 162, 235, 0.8)'
      }
    ]
  }

  const timeChartData = {
    labels: timeLabel,
    datasets: [
      {
        data: timeData,
        label: '交通量',
        backgroundColor: 'rgba(53, 162, 235, 0.8)'
      }
    ]
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={6}>
        <Bar
          options={
            {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: '車種ごとの交通量'
                }
              },
              scales: {
                y: {
                  ticks: {
                    callback: function (val, index) {
                      return index % 2 === 0 ? this.getLabelForValue(Number(val)) : '';
                    }
                  }
                }
              }
            }
          }
          data={modelChartData}
        />
      </Grid>
      <Grid item xs={6}>
        <Bar
          options={
            {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: props.locationAddress + 'の交通量'
                }
              },
              scales: {
                y: {
                  ticks: {
                    callback: function (val, index) {
                      return index % 2 === 0 ? this.getLabelForValue(Number(val)) : '';
                    }
                  }
                }
              }
            }
          }
          data={timeChartData}
        />
      </Grid>
    </Grid>
  )
}
