import { Difference } from "./Difference.js";

export const Display = ({ data }) => {
  let jsx;
  switch (data) {
    case -2:
      jsx = <p className="pt-3">Invalid JSON received.</p>;
      break;
    case -1:
      jsx = (
        <>
          <p className="pt-3">Failed to fetch.</p>
          <p>Please check authorisation token.</p>
        </>
      );
      break;
    case 0:
      jsx = <p className="pt-3">Loading ...</p>;
      break;
    default:
      jsx = (
        <>
          <p className="pt-3">Server Time: {data}</p>
          <Difference time={data} />
        </>
      );
  }
  return jsx;
};
