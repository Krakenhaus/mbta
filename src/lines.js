import React from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';

/*
   0	Light Rail
   1	Heavy Rail
   2	Commuter Rail
   3	Bus
   4	Ferry
*/
const isRail = (route) => {
  const type = route.attributes.type;
   return type === 0 ||
          type === 1 ||
          type === 2;
}

const byName = (routeA, routeB) => {
  if (routeA.attributes.long_name < routeB.attributes.long_name) { return -1 }
  if (routeA.attributes.long_name > routeB.attributes.long_name) { return 1 }
  return 0;
}

class Lines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rails: []
    };
  }

  async componentDidMount() {
    const response = await fetch('https://api-v3.mbta.com/routes');
    const routes = await response.json();
    const rails = routes.data.filter(isRail).sort(byName);
    this.setState({ rails });
  }

  renderLines() {
    const lineItems = this.state.rails.map(rail =>
      <ListGroupItem key={rail.id} tag="a" href="#">
          {rail.attributes.long_name}
      </ListGroupItem>
    );

    return (
      <ListGroup>
        {lineItems}
      </ListGroup>
    )
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs='3'>
            {this.renderLines()}
          </Col>
          <Col xs='auto'>
            Hi, Stuff here at some point
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lines;
