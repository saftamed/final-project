import "../css/featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState,useMemo } from "react";
import axios from "axios";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
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
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://store-ltt.herokuapp.com/api/v1/order/stats2");
        console.log(res.data);
        var dd = [];
        res.data.map((item) =>
         dd.push({ name: MONTHS[item._id - 1], "total": item.total })
        );
        setIncome(dd)
      } catch {}
    };
    getStats();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue  {income[0]?.name} </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor((income[0]?.total - income[1]?.total)/100)}{" "}
            {Math.floor((income[0]?.total - income[1]?.total)/100) < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
      </div>
      <div className="featuredItem">
      <span className="featuredTitle">Revanue  {income[1]?.name} </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">

  
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Revanue This year</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income.reduce(function (total, num) {
            return total + Math.round(num.total);
          },0) }</span>
        </div>
      </div>
    </div>
  );
}