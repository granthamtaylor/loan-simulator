import React, { useState, useEffect } from 'react';

import Frame from "./../Frame/Frame";
import Dashboard from "./Dashboard/Dashboard";
import About from "./About/About";
import Applicant from "./Applicants/Applicant";
import Leaderboard from "./Leaderboard/TableRanking";
import Modeling from "./Modeling/Modeling";
import History from "./History/History";

import API from '../../helper/django.service';

export default function Main() {

  const [ applicant, setApplicant ] = useState( {} );
  const [ dashboardData, setDashboardData ] = useState({
    stats: [], 
    portfolioValue: [],
    swarmPlot: []
  });
  const [ leaderboard, setLeaderboard ] = useState( {} );

  useEffect (() => {
    API.getApplication()
      .then((response) => { 
        setApplicant(response?.data[0]);
      });
  }, []);

  useEffect (() => {
  
    handleDashboardUpdate();
    handleLeaderboardUpdate();

  }, [applicant]);

  function handleLeaderboardUpdate() {

    API.getRanking()
      .then((response) => { 
        setLeaderboard(response?.data);
      });

  };

  function handleDashboardUpdate() {

    API.getStats()
    .then((response) => { 
      setDashboardData( prevDashboardData => {
        return {
          ...prevDashboardData,
          stats: response.data[0]
        }
      });
    });

    API.getSwarmPlot()
    .then((response) => { 
      setDashboardData( prevDashboardData => {
        return {
          ...prevDashboardData,
          swarmPlot: response.data
        }
      });
    });

    API.getPortfolioValue()
    .then((response) => { 
      setDashboardData( prevDashboardData => {
        return {
          ...prevDashboardData,
          portfolioValue: response.data
        }
      });
    });

  };

  return (
    <div className="h-screen flex">
      <Frame n_reviewed={ dashboardData?.stats?.n_reviewed }>
        <div label="Application Review" icon="FaPiggyBank"> 
          <Applicant applicant={applicant} setApplicant={setApplicant} />
        </div> 
        <div label="Review History" icon="FaBars" blank="10"> 
          <History/>
        </div>
        <div label="Portfolio Overview" icon="FaChartBar" blank="10"> 
          <Dashboard data={dashboardData}/>
        </div> 
        <div label="Competitive Analysis" icon="FaTable"> 
          <Leaderboard leaderboard={leaderboard} />
        </div> 
        <div label="Machine Learning" icon="FaRobot" blank="10"> 
          <Modeling/>
        </div> 
        <div label="About" icon="FaInfo"> 
          <About/>
        </div> 
      </Frame> 
    </div> 
  )
}