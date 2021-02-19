import React, {useState, useEffect} from "react";

import Tooltip from "../utils/Tooltip";
import {term} from "../utils/term";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [monthlyDeveloper, setMonthlyCount] = useState(null);
  const [weeklyDeveloper, setWeeklyCount] = useState(null);

  const getUnique = (res) => {
    let result = res.map(dev => dev.developerList).reduce((dev, current) => current.concat(dev), [])
    return result.filter((dev, index) => {
          return result.indexOf(dev) === index
      }).filter((dev) => !dev.includes("dependabot"))
  }

  useEffect(() => {

    let today = new Date(); 
    // today
    let dd = today.getUTCDate(); 
    let mm = today.getUTCMonth()+1; 
    let yyyy = today.getUTCFullYear();

    //week ago
    let before7Daysdate = new Date(today.setDate(dd - 7))
    let dd7ago = before7Daysdate.getUTCDate(); 
    let mm7ago = before7Daysdate.getUTCMonth()+1; 
    let yyyy7ago = before7Daysdate.getUTCFullYear();
    let month = mm7ago < 10 ? '-0' : '-'
    let date7ago = yyyy7ago + month + mm7ago + '-' + dd7ago;

    let developer_list = "developer_list_by_"+ mm + "_" + dd + "_" + yyyy

    fetch("https://rt.pipedream.com/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer 632a32ecca7db94e4a46fc11f0418a88"
      },
      body:  JSON.stringify({
        query: `SELECT date, developer_set FROM ${developer_list} order by date`,
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        let res = result.resultSet.Rows
        res = res.map(data => ({date: data.Data[0].VarCharValue, developerList: data.Data[1].VarCharValue.slice(1,-2).split(", ")}))
        res = res.slice(1, res.length)
        let weekIndex = res.findIndex(r => r.date === date7ago)
        let weekRes = res.slice(weekIndex, res.length)
        let monthlyDeveloper = getUnique(res)
        let weeklyDeveloper = getUnique(weekRes)
        setMonthlyCount(monthlyDeveloper.length)
        setWeeklyCount(weeklyDeveloper.length)
        setIsLoaded(true);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
    .catch(err => {
      console.error(err);
    });
  }, [])



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>Monthly Active Developer(External) <Tooltip text={term.monthly_github_developer} />: <strong className="green">{monthlyDeveloper}</strong></div>
        <div>Weekly Active Developer(External) <Tooltip text={term.weekly_github_developer} />: <strong className="green">{weeklyDeveloper}</strong></div>
      </div>
    );
  }
}