// import { parseISO, formatDistanceToNow } from "date-fns/parseISO";
import parseISO from "date-fns/parseISO";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import React from "react";

const TimeAgo = ({ timestamp }) => {
  let timeAge = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAge = `${timePeriod} ago`;
  }
  return (
    <span>
      &nbsp; Posted: <i>{timeAge}</i>
    </span>
  );
};

export default TimeAgo;
