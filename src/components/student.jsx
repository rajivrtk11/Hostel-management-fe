import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';
import { arrayBufferToBase64 } from "../utils";

const Student = ({ stuentDetails: student }) => {

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/student/${student._id}`}>
      {student.image.data?.data && <img width="211" height="200" border-radius='8%' src={`data:image/jpeg;base64,${arrayBufferToBase64(student.image.data.data)}`}></img>}
      </Link>
      <Card.Body>
        <Link to={`/student/${student._id}`}>
          <Card.Title as="div">
            <strong>{student.name}</strong>
          </Card.Title>
        </Link>

        <Row>
          <Col>Room No: {student.roomNo}</Col>
        </Row>
        <Row>
          <Col>Stream: {student.category}</Col>
        </Row>
        <Card.Text>
          Contact:
          <a href={`tel:${student.contact}`}>{student.contact}</a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Student;