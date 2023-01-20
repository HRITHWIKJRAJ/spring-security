import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import sendRequest from "../services/httpService";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const Dashboard = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  useEffect(() => {
    sendRequest("/api/assignments", "GET", user.jwt).then(
      (assignmentResponse) => {
        setAssignments(assignmentResponse.assignments);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
      }
    );
  }, []);

  function createAssignment() {
    if (assignments.length < assignmentEnums.length) {
      sendRequest("api/assignments", "POST", user.jwt).then((assignment) => {
        navigate(`/assignments/${assignment.id}`);
      });
    } else {
      alert("Max Assignment Limit Reached");
    }
  }

  return (
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
      <Button
        style={{ marginBottom: "1em" }}
        onClick={() => createAssignment()}
      >
        Add new assignment
      </Button>
      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, 15rem)" }}
        >
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              style={{ width: "15rem", height: "15rem" }}
            >
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment #{assignment.number}</Card.Title>
                <Card.Subtitle>
                  {assignmentEnums.length > 0
                    ? assignmentEnums[assignment.number - 1].assignmentName
                    : ""}
                </Card.Subtitle>
                <div className="d-flex align-items-start">
                  <StatusBadge text={assignment.status} />
                </div>
                <Button
                  onClick={() => {
                    navigate(`/assignments/${assignment.id}`);
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
