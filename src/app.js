/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import WeeklyActiveDevCount from "./component/WeeklyActiveDevCount";
import MonthlyActiveDevCount from "./component/MonthlyActiveDevCount";
import ActiveAccounts from "./component/ActiveAccounts";
import ActiveValidators from "./component/ActiveValidators";
import NetworkStats from "./component/NetworkStats";

import "./app.css"

export default () => {
  return <div className="container">
    <div className="active-developer">
    <MonthlyActiveDevCount />
    <WeeklyActiveDevCount />
    </div>
    <div className="content">
        <ActiveAccounts />
        <ActiveValidators />
        <NetworkStats />
    </div>
  </div>
}