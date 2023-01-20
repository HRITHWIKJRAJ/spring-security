import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommentContainer from "../CommentContainer/commentContainer";
import sendRequest from "../services/httpService";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const AssignmentView = () => {
  const user = useUser();
  const navigate = useNavigate();
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [show, setShow] = useState(false);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    status: null,
    number: null,
  });
  // const prevAssignmentValue = useRef(assignment);

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
      setShow(true);
      const timer = setTimeout(() => {
        console.log("timer called");
        setShow(false);
      }, 1500);
      return () => clearTimeout(timer);
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
        let assignmentData = assignmentResponse.assignments[0];
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
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
            <h1>
              {assignmentEnums.length > 0
                ? assignmentEnums[assignment.number - 1].assignmentName
                : ""}
            </h1>
          </Col>
          <Col>
            <StatusBadge text={assignment.status} />
          </Col>
        </Row>
        <div>
          {assignment ? (
            <>
              <Form.Group
                as={Row}
                className="my-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3" md="2">
                  Assignment Number
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <DropdownButton
                    as={ButtonGroup}
                    id="assignmentNumber"
                    variant={"info"}
                    title={
                      assignment.number
                        ? `Assignment ${assignment.number}`
                        : "Select an Assignment"
                    }
                    onSelect={(selectedElement) => {
                      updateAssignment("number", selectedElement);
                    }}
                  >
                    {assignmentEnums.map((assignmentEnum) => (
                      <Dropdown.Item
                        key={assignmentEnum.assignmentNum}
                        eventKey={assignmentEnum.assignmentNum}
                      >
                        {assignmentEnum.assignmentNum}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="my-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3" md="2">
                  GitHubURL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="url"
                    placeholder="https://github.com/.../repo-name"
                    value={assignment.githubUrl}
                    onChange={(e) =>
                      updateAssignment("githubUrl", e.target.value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="my-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3" md="2">
                  Branch
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="text"
                    placeholder="Your branch name"
                    value={assignment.branch}
                    onChange={(e) => updateAssignment("branch", e.target.value)}
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
                  <a
                    href={assignment.codeReviewVideoUrl}
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewVideoUrl}
                  </a>
                </Col>
              </Form.Group>
              <Row>
                {assignment.status === "Completed" ? (
                  <>
                    <Button
                      id="back"
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      variant="secondary"
                    >
                      Back
                    </Button>
                  </>
                ) : (
                  <>
                    <Col className="float-right">
                      {assignment.status === "Completed" ? (
                        <></>
                      ) : (
                        <>
                          {assignment.status === "Pending Submission" ||
                          assignment.status === "Submitted" ? (
                            <Button
                              id="submit"
                              type="button"
                              onClick={() => saveAssignment("Submitted")}
                              variant="primary"
                            >
                              Submit
                            </Button>
                          ) : (
                            <Button
                              id="resubmit"
                              type="button"
                              onClick={() => saveAssignment("Re-Submitted")}
                              variant="primary"
                            >
                              Re-Submit
                            </Button>
                          )}
                        </>
                      )}
                    </Col>
                    <Col>
                      <Button
                        id="back"
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        variant="secondary"
                      >
                        Back
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
              <CommentContainer assignmentId={assignmentId} />
            </>
          ) : (
            <></>
          )}
        </div>
        {show ? (
          <Alert key="success" variant="success">
            Submitted successfully.
          </Alert>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default AssignmentView;
