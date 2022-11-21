import { useState, useEffect } from "react";

export const Metrics = () => {
  const [metrics, setMetrics] = useState("");
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("https://timeserver.onrender.com/metrics", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        setMetrics("");
      } else {
        resp.text().then((data) => {
          setMetrics(data);
        });
      }
    };
    getData();
    const timer = setInterval(() => {
      getData();
    }, 30000);
    return () => clearInterval(timer);
  }, []);
  return metrics ? <pre>{metrics}</pre> : <p>Loading ...</p>;
};
