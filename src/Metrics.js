import { useState, useEffect } from "react";

export const Metrics = () => {
  const [metrics, setMetrics] = useState("");
  useEffect(() => {
    const getData = async () => {
      setMetrics("");
      const resp = await fetch("https://timeserver.onrender.com/metrics", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
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
    getData();
    if (metrics !== "false") {
      const timer = setInterval(() => {
        getData();
      }, 30000);
      return () => clearInterval(timer);
    }
  }, []);

  let jsx;
  switch (metrics) {
    case "false":
      jsx = <p>No response from server.</p>;
      break;
    case "":
      jsx = <p>Loading ...</p>;
      break;
    default:
      jsx = <pre>{metrics}</pre>;
  }
  return <>{jsx}</>;
};
