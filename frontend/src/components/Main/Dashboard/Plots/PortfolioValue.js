import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export default function PortfolioValue(props) {

 return ( 

    <ResponsiveLine
      data={ props.data }
      margin={{ top: 20, right: 40, bottom: 90, left: 90 }}
      xScale={{ type: 'linear' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      yFormat=" >($0,.2f"
      curve="monotoneX"
      colors={{ scheme: 'dark2' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: 'Loans Accepted',
          legendOffset: 50,
          legendPosition: 'middle',
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Current Portfolio Value',
          legendOffset: -60,
          legendPosition: 'middle',
          format:" >-$,.2~s"
      }}
      lineWidth={4}
      lineColor="green"
      enablePoints={false}
      useMesh={true}
    />
  )
}