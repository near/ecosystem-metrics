/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";

import MonthlyActiveDevCount from "./component/MonthlyActiveDevCount";
import ActiveAccounts from "./component/ActiveAccounts";
import ActiveValidators from "./component/ActiveValidators";
import NetworkStats from "./component/NetworkStats";
import GithubStats from "./component/GithubStats";
import Partner from "./component/Partner";
import DepositAmount from "./component/DepositAmount";

import "./app.css"

export default () => {
  return <Container>
      <h1 style={{fontWeight:"900"}}>Ecosystem Metrics</h1>
      <Partner />
      <Container>
        <Row>
          <Col md="4">
            <ActiveValidators />
          </Col>
          <Col>
            <NetworkStats />
          </Col>
        </Row>
     
        <hr />
        <MonthlyActiveDevCount />
        <hr />
        <GithubStats />
        <hr />
        <ActiveAccounts />
        <hr />
        <DepositAmount />
      </Container>
  </Container>
}