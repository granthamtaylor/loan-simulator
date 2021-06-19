import React from "react";

import PortfolioValue from './Plots/PortfolioValue'
import SwarmPlot from './Plots/SwarmPlot'
import Stats from './Stats/Stats'

export default function Dashboard(props) {

  return (
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
        <div className="w-full p-6 space-y-4">
          <Stats data={props.data.stats} />
          <div className="shadow h-96 rounded-lg bg-white pb-4 pt-4">
            <h2 className="text-center text-md">Your Portfolio Value Over Time</h2>
            <PortfolioValue data={props.data.portfolioValue} />
          </div>
          <div className="shadow h-96 rounded-lg bg-white pb-4 pt-4">
            <h2 className="text-center text-md">Analyzing the Distribution of Your Loan Decisions</h2>
            <SwarmPlot data={props.data.swarmPlot} />
          </div>
        </div>
      </main>
    </div>
  )

}