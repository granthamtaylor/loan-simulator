import React from 'react';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'


export default function SwarmPlot(props) {

  return ( 

    <ResponsiveSwarmPlot
      data={props.data}
      groups={[ 'Approved', 'Rejected' ]}
      value="value"
      colorBy="color"
      valueFormat="$,.0f"
      valueScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
      size={10}
      forceStrength={6}
      simulationIterations={50}
      margin={{ top: 50, right: 70, bottom: 50, left: 70 }}
      axisBottom={{
        orient: 'bottom',
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format:" >-$,.2~s"
      }}
      axisRight={{
        orient: 'right',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format:" >-$,.2~s"
      }}
      motionStiffness={50}
      motionDamping={10}
    />
  )
}