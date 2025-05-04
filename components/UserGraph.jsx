import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function CustomGauge() {
  return (
    <Gauge
      value={21}
      valueMax={30}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: 'translate(0px, 0px)',
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#3F51B5',
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax} `}
      width={400}
      height={300}
    />
  );
}
