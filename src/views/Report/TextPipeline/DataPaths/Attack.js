import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Gallery } from '../../../../components';

const Index = (props) => {
    const { data, path } = props;
    return (
      <div class="row">
        <div class="col attack-section">
          <Gallery data={data} path={path} />
        </div>
      </div>
    );

}

export default Index;
