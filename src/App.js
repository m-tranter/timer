import { useState, useRef } from "react";
import { TimePanel } from "./TimePanel.js";
import { Metrics } from "./Metrics.js";
import "./App.css";

export default function MyApp() {
  const [auth, setAuth] = useState("");
  const [token, setToken] = useState("");
  const myInput = useRef("myInput");

  const call = () => {
    setToken(auth);
    myInput.current.blur();
  };

  const handler = (e) => {
    setAuth(e.target.value);
  };

  const clear = () => {
    setAuth("");
  };

  const click = (e) => {
    if (e.key === "Enter") {
      call();
    }
  };
  return (
    <>
      <h1 className="text-primary text-center mb-3">
        Connex One Technical Task
      </h1>
      <div className="text-center container mb-3">
        <input
          ref={myInput}
          autoFocus="autofocus"
          value={auth}
          onFocus={clear}
          onChange={handler}
          onKeyUp={click}
          placeholder="Enter authorisation token"
          type="text"
          width="100%"
        />
        <button className="ms-3" type="button" onClick={call}>
          Connect to server
        </button>
        <div className="row mt-2 justify-content-evenly gy-3 gx-3">
          <div className="col-lg-3 col-sm-10 text-center">
            <h2>Time</h2>
            <div className="time">{token && <TimePanel token={token} />}</div>
          </div>
          <div className="col-lg-9 col-sm-12 text-center">
            <h2>Metrics</h2>
            <div className="metrics">
              <Metrics />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
