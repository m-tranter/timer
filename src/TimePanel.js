import { Prev } from "./Difference.js";
import { Display } from "./Display.js";
import { validate } from "./validate.js";
import { useState, useEffect } from "react";

export const TimePanel = ({ token }) => {
  const [data, setData] = useState(0);
  const lastToken = Prev(token);
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("https://timeserver.onrender.com/time", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!resp.ok) {
        setData(-1);
      } else {
        let time = await resp.json();
        setData(validate(time) ? time.epoch : -2);
        console.log(data === -2 ? "Invalid JSON." : "JSON validated.");
      }
    };
    if (lastToken !== token) {
      getData();
    }
    if (data > 0) {
      const timer = setTimeout(() => {
        getData();
      }, 30000);
      return () => clearTimeout(timer);
    }
  });
  return <Display data={data} />;
};
