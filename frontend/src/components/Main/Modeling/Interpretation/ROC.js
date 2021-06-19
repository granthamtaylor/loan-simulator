import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export default function ROC(props) {

  console.log(props?.data)

  return ( 
    <div className="h-96">
      <ResponsiveLine
        data={ props?.data }
        margin={{ top: 40, right: 40, bottom: 80, left: 90 }}
        xScale={{ type: 'linear', min: '0', max: '1'}}
        yScale={{ type: 'linear', min: '0', max: '1'}}
        yFormat=" >(0,.2f"
        xFormat=" >(0,.2f"
        colors={{ scheme: 'dark2' }}
        curve="basis"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: 'False Positive Rate',
          legendOffset: 50,
          legendPosition: 'middle',
          format: " >-.0%"
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'True Positive Rate',
          legendOffset: -60,
          legendPosition: 'middle',
          format: " >-.0%"
        }}
        lineWidth={4}
        enablePoints={false}
        enableArea={true}
        useMesh={true}
        enableCrosshair={false}
      />
    </div>
  )
}