import { useEffect, useState } from "react";
import "./App.css";
import LineGraph from "./components/LineGraph";
import Summury from "./components/Summury";
import Config from "./components/Config";

function App() {
  const [totalConfiremd, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeath, setTotalDeath] = useState(0);
  const [loading, setLoading] = useState(false);
  const [summury, setSummery] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState("");
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    setLoading(true);
    Config.get(`/summary`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalRecovered(res.data.Global.TotalRecovered);
        setTotalDeath(res.data.Global.TotalDeaths);
        setSummery(res.data);
      }
    });
  }, []);

  const formateDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${year}-${month}-${_date}`;
  };

  const dateHandle = (e) => {
    setDays(e.target.value);
    const d = new Date();
    const to = formateDate(d);
    const from = formateDate(d.setDate(d.getDate() - e.target.value));
    getReportByDateRange(country, from, to);
  };

  const countryHandle = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formateDate(d);
    const from = formateDate(d.setDate(d.getDate() - days));

    // console.log(from , to)

    getReportByDateRange(e.target.value, from, to);
  };

  const getReportByDateRange = (countrySlug, from, to) => {
    Config.get(
      `https://api.covid19api.com/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
    ).then((res) => {
      const yAxis = res.data.map((d) => d.Cases);
      const xAxisLabel = res.data.map((d) => d.Date);
      const covidDetails = summury.Countries.find(
        (country) => country.Slug === countrySlug
      );
      setCoronaCountAr(yAxis);
      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeath(covidDetails.TotalDeaths);
      setLabel(xAxisLabel);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Summury
        totalConfiremd={totalConfiremd}
        totalRecoverd={totalRecovered}
        totalDeaths={totalDeath}
        country={country}
      />
      <div className="select-detail">
        <select value={country} onChange={countryHandle}>
          <option value="">Select Country</option>
          {summury.Countries &&
            summury.Countries.map((country) => (
              <option key={country.Slug} value={country.Slug}>
                {country.Country}
              </option>
            ))}
        </select>
        <select value={days} onChange={dateHandle}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
      <LineGraph yAxis={coronaCountAr} label={label} />
    </div>
  );
}

export default App;
