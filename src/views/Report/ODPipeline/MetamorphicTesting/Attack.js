import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
//<Gallery data={data} path={path} />
import Technique from './Technique';

const Index = (props) => {

  const { data, path } = props;
  const keys = Object.keys(data);
  return (
    <Row>
      <Col className="attack-section">
        {data.one_liner !== null ? <p>{data.one_liner}</p> : null}
        <Tabs defaultActiveKey={keys[1]}>
          {keys.map((key, i) => {
            if (key !== "one_liner") {
              return (
                <Tab eventKey={key} title={key} key={i}>
                  <Technique title={key} data={data[keys[i]]} path={path} />
                  {console.log(data.one_liner)}
                </Tab>
              );
            }
            return null
          })}
        </Tabs>
      </Col>
    </Row>
  );
}

export default Index;
