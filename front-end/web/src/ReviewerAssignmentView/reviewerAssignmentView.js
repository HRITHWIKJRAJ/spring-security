import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Comment from "../Comment/comment";
import CommentContainer from "../CommentContainer/commentContainer";
import sendRequest from "../services/httpService";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const ReviewerAssignmentView = () => {
  const user = useUser();
  const navigate = useNavigate();
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    status: "",
    number: null,
    codeReviewVideoUrl: "",
  });

  function updateAssignment(column, value) {
    const newAssignment = { ...assignment };
    newAssignment[column] = value;
    setAssignment(newAssignment);
  }

  function saveAssignment(status) {
    if (assignment.status !== status) {
      assignment.status = status;
    }
    save();
  }

  function save() {
    sendRequest(
      `/api/assignments/${assignmentId}`,
      "PUT",
      user.jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  }

  // useEffect(() => {
  //   if (prevAssignmentValue.current.status !== assignment.status) {
  //     save();
  //   } else {
  //     prevAssignmentValue.current = assignment;
  //   }
  // }, [assignment]);

  useEffect(() => {
    sendRequest(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        if (assignmentData.codeReviewVideoUrl === null)
          assignmentData.codeReviewVideoUrl = "";
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.assignmenStatusEnums);
      }
    );
  }, []);

  return (
    <>
      <Container className="mt-5">
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
        <Row className="d-flex align-items-center">
          <Col>
            <h1>Assignment {assignmentId}</h1>
          </Col>
          <Col>
            <StatusBadge text={assignment.status} />
          </Col>
        </Row>
        <div>
          {assignment ? (
            <>
              <Form.Group as={Row} className="my-3" controlId="githubUrl">
                <Form.Label column sm="3" md="2">
                  GitHubURL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="url"
                    placeholder="https://github.com/.../repo-name"
                    value={assignment.githubUrl}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-3" controlId="branch">
                <Form.Label column sm="3" md="2">
                  Branch
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="text"
                    placeholder="Your branch name"
                    value={assignment.branch}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="my-3"
                controlId="codeReviewVideoUrl"
              >
                <Form.Label column sm="3" md="2">
                  Review Video URL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="text"
                    placeholder="www.youtube.com"
                    value={assignment.codeReviewVideoUrl}
                    onChange={(e) =>
                      updateAssignment("codeReviewVideoUrl", e.target.value)
                    }
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  {assignment.status === "Completed" ? (
                    <Button
                      style={{ float: "left" }}
                      id="submit"
                      type="button"
                      onClick={() =>
                        saveAssignment(assignmentStatuses[2].status)
                      }
                      variant="primary"
                    >
                      Re-Claim
                    </Button>
                  ) : (
                    <Button
                      style={{ float: "left" }}
                      id="submit"
                      type="button"
                      onClick={() =>
                        saveAssignment(assignmentStatuses[5].status)
                      }
                      variant="primary"
                    >
                      Complete
                    </Button>
                  )}
                </Col>
                <Col>
                  {assignment.status === "Needs Update" ? (
                    <Button
                      style={{ float: "left" }}
                      id="submit"
                      type="button"
                      onClick={() =>
                        saveAssignment(assignmentStatuses[2].status)
                      }
                      variant="primary"
                    >
                      Re-Claim
                    </Button>
                  ) : (
                    <Button
                      style={{ float: "left" }}
                      id="submit"
                      type="button"
                      onClick={() =>
                        saveAssignment(assignmentStatuses[3].status)
                      }
                      variant="primary"
                    >
                      Needs Work
                    </Button>
                  )}
                </Col>
                <Col>
                  <Button
                    style={{ float: "left" }}
                    id="back"
                    type="button"
                    onClick={() => {
                      navigate(`/dashboard`);
                    }}
                    variant="secondary"
                  >
                    Back
                  </Button>
                </Col>
              </Row>
              <CommentContainer assignmentId={assignmentId} />
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </>
  );
};

export default ReviewerAssignmentView;
