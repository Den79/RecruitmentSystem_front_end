import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import LabourersSelector from "./LabourersSelector";
import DatePicker from "react-datepicker";
import JobsSelector from "./JobsSelector";
import {
  saveIncidentReport,
  getIncidentReportDetails,
} from "../api/IncidentReportsApi";

const IncidentReportForm = (props) => {
  const [report, setReport] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = (event) => {
    event.preventDefault();
    saveIncidentReport({ token: props.auth.JWToken, report })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/incident-reports");
        }
      })
      .catch((error) => {
        console.log("Something went wrong! " + error.response.data.message);
      });
  };

  const onInputChange = (event) => {
    setReport({
      ...report,
      [event.target.id]: event.target.value,
    });
  };

  const onJobChange = (job) => {
    setReport({
      ...report,
      jobId: job && job.length > 0 ? job[0].id : null,
      labourers: null,
    });
  };

  useEffect(() => {
    let mounted = true;
    const query = new URLSearchParams(props.location.search);
    const jobId = query.get("jobId");
    if (jobId) {
      setReport({ jobId: jobId });
    }
    if (props.match.params.id) {
      getIncidentReportDetails({
        token: props.auth.JWToken,
        id: props.match.params.id,
      })
        .then((response) => {
          if (mounted) {
            if (response.status === 200) {
              response.data.date = new Date(response.data.date);
              setReport(response.data);
              setIsLoading(false);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Something went wrong! " + error.response.data.message);
        });
    } else {
      setIsLoading(false);
    }
    return () => (mounted = false);
  }, [props.match.params.id, props.location.search, props.auth.JWToken]);

  if (isLoading) return <div>Loading...</div>;
  else {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {report.id ? "Edit Incident Report" : "New Incident Report"}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit} method="post">
            <Row>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Job</label>
                  <JobsSelector
                    required={true}
                    auth={props.auth}
                    selected={report.jobId}
                    onChange={(job) => onJobChange(job)}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-1" md="6">
                <FormGroup>
                  <label>Labourers involved</label>
                  <LabourersSelector
                    multi={true}
                    disabled={!report.jobId}
                    jobId={report.jobId}
                    auth={props.auth}
                    selected={report.labourers}
                    onChange={(selected) =>
                      setReport({
                        ...report,
                        labourers:
                          selected && selected.length > 0
                            ? selected.map((item) => {
                                return { labourerId: item.id };
                              })
                            : null,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="4">
                <FormGroup>
                  <label>Date</label>
                  <DatePicker
                    required
                    className="form-control"
                    selected={report.date}
                    onChange={(selected) =>
                      setReport({ ...report, date: selected })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Summary</label>
                  <Input
                    required
                    type="textarea"
                    id="summary"
                    name="Summary"
                    placeholder="Summary"
                    value={report.summary || ""}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Button type="submit" className="btn btn-primary">
                  {report.id ? "Update" : "Save"}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
};

export default IncidentReportForm;
