import React from "react";
import { Badge } from "react-bootstrap";

const StatusBadge = (props) => {
  const { text } = props;
  function getColorOfBadge() {
    if (text === "Completed") return "success";
    else if (text === "Needs Update") return "danger";
    else if (text === "Pending Submission") return "warning";
    else if (text === "In Review") return "info";
    else return "primary";
  }
  return (
    <Badge
      pill
      bg={getColorOfBadge()}
      style={{
        fontSize: "1em",
      }}
    >
      {text}
    </Badge>
  );
};

export default StatusBadge;
