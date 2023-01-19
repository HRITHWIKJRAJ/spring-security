import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import sendRequest from "../services/httpService";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const ReviewerDashboard = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    sendRequest("api/assignments", "GET", user.jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });
  }, []);

  function claimAssignment(assignment) {
    assignment.status = "In Review";
    sendRequest(
      `api/assignments/${assignment.id}`,
      "PUT",
      user.jwt,
      assignment
    ).then((updatedAssignment) => {
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i] = updatedAssignment;
      setAssignments(assignmentsCopy);
    });
  }

  return (
    <Container className="mt-5">
      <div style={{ margin: "2em" }}>
        <Row>
          <Col>
            <span
              style={{ cursor: "pointer", float: "right" }}
              onClick={() => {
                user.setJwt(null);
                navigate(`/`);
              }}
            >
              Logout
            </span>
          </Col>
        </Row>
        <div className="assignment-wrapper submitted">
          <div
            className="h4 px-2"
            style={{
              width: "min-content",
              marginTop: "-2em",
              marginBottom: "1em",
              backgroundColor: "white",
              whiteSpace: "nowrap",
            }}
          >
            Awaiting Review
          </div>
          {assignments &&
          assignments.filter(
            (assignment) =>
              assignment.status === "Submitted" ||
              assignment.status === "Re-Submitted"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter(
                  (assignment) =>
                    assignment.status === "Submitted" ||
                    assignment.status === "Re-Submitted"
                )
                .sort((a, b) => {
                  if (a.status === "Resubmitted") return -1;
                  return 1;
                })
                .map((assignment) => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.id}</Card.Title>
                      <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status} />
                      </div>
                      {/* <Card.Text>{assignment.name}</Card.Text> */}
                      <Button
                        onClick={() => {
                          claimAssignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No Assignments Found</div>
          )}
        </div>
        <div className="assignment-wrapper in-review">
          <div
            className="h4 px-2"
            style={{
              width: "min-content",
              marginTop: "-2em",
              marginBottom: "1em",
              backgroundColor: "white",
              whiteSpace: "nowrap",
            }}
          >
            In Review
          </div>
          {assignments &&
          assignments.filter((assignment) => assignment.status === "In Review")
            .length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.id}</Card.Title>
                      <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status} />
                      </div>
                      {/* <Card.Text>{assignment.name}</Card.Text> */}
                      <Button
                        onClick={() => {
                          navigate(`/assignments/${assignment.id}`);
                        }}
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No Assignments Found</div>
          )}
        </div>
        <div className="assignment-wrapper needs-update">
          <div
            className="h4 px-2"
            style={{
              width: "min-content",
              marginTop: "-2em",
              marginBottom: "1em",
              backgroundColor: "white",
              whiteSpace: "nowrap",
            }}
          >
            Needs Update
          </div>
          {assignments &&
          assignments.filter(
            (assignment) => assignment.status === "Needs Update"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => (
                  <Card
                    key={assignment.id}
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment #{assignment.id}</Card.Title>
                      <div className="d-flex align-items-start">
                        <StatusBadge text={assignment.status} />
                      </div>
                      {/* <Card.Text>{assignment.name}</Card.Text> */}
                      <Button
                        onClick={() => {
                          claimAssignment(assignment);
                        }}
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No Assignments Found</div>
          )}
        </div>
      </div>
    </Container>
  );
};
export default ReviewerDashboard;
