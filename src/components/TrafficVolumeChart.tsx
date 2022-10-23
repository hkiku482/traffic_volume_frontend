import { ArgumentAxis, BarSeries, Chart, Title, ValueAxis } from "@devexpress/dx-react-chart-material-ui"
import { Animation } from "@devexpress/dx-react-chart"
import { Grid, Paper } from "@mui/material"
import { Result } from "../domains/result"

export const TrafficVolumeChart = (props: { result: Result }): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper>
          <Chart
            data={props.result.models}
          >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              valueField="交通量"
              argumentField="車種"
            />
            <Animation />
            <Title text="車種ごとの交通量" />
          </Chart>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper>
          <Chart
            data={props.result.time}
          >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              valueField="交通量"
              argumentField="時間"
            />
            <Animation />
            <Title text="時間ごとの交通量" />
          </Chart>
        </Paper>
      </Grid>
    </Grid>
  )
}
