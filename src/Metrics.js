import { Prev } from "./Difference.js";
import { useState, useEffect } from "react";

export const Metrics = ({ token }) => {
  const [metrics, setMetrics] = useState("");
  const lastToken = Prev(token);
  useEffect(() => {
    const getData = async () => {
      setMetrics("");
      const resp = await fetch("https://timeserver.onrender.com/metrics", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!resp.ok) {
        setMetrics("false");
      } else {
        resp.text().then((data) => {
          setMetrics(data);
        });
      }
    };
    if (lastToken !== token) {
      getData();
    }
    if (metrics !== "false") {
      const timer = setTimeout(() => {
        getData();
      }, 30000);
      return () => clearTimeout(timer);
    }
  });

  let jsx;
  switch (metrics) {
    case "false":
      jsx = <p>Please check authorisation token.</p>;
      break;
    case "":
      jsx = <p>Loading ...</p>;
      break;
    default:
      jsx = <pre>{metrics}</pre>;
  }
  return <>{jsx}</>;
};
