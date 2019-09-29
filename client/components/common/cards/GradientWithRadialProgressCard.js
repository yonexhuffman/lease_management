import React from "react";
import { Card, CardBody } from "reactstrap";
import { CircularProgressbar } from "react-circular-progressbar";

const GradientWithRadialProgressCard = ({
  icon = "iconsminds-bell",
  title = "title",
  detail = "detail",
  percent = 0.5,
  progressText = "8/100"
}) => {
  return (
    <Card className="progress-banner">
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          <i
            className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
          />
          <div>
            <p className="lead text-white">{title}</p>
            <p className="text-small text-white">{detail}</p>
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative">
          <CircularProgressbar
            strokeWidth={4}
            // percentage={percent}
            text={progressText}
            value={percent}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default GradientWithRadialProgressCard;
