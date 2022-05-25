import React, { useEffect, useMemo, useState } from 'react'
import FeaturedInfo from '../components/Fea'
import Chart from '../components/Chart'
import axios from 'axios'
function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://store-ltt.herokuapp.com/api/v1/user/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
  return (
    <div>
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
    </div>
  )
}

export default Home