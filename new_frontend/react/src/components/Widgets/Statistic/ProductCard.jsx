import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import "../../../../src/index.css"
export default function ProductCard({ params }) {
  let cardClass = ['prod-p-card'];
  let iconClass = 'text-primary';
  let textClass = '';
  if (params.variant) {
    cardClass = [...cardClass, `bg-${params.variant}`];
    textClass = 'text-white';
    iconClass = 'text-white';
  }

  let rowClass = ['align-items-center'];
  if (params.secondaryText) {
    rowClass = [...rowClass, 'mb-4'];
  }

  return (
    <Card className={`${params.bg_card_color} card-shadow` }>
      <Card.Body>
        <Row >
          <Col>
            <h4 className={`m-b-5  ${params.text_color}  `}>{params.type ? "Department name:":""} {params.title}</h4 >
    {
      params.number? "":        <h3 className={`mb-0 ${params.text_color} ${params.type ? "fs-4" : ""}`}>Role: {params.primaryText}</h3>
    }
            <h3 className={`mb-0 ${params.text_color} ${params.type ? "fs-4" : ""}`}> {params.primaryText}</h3>

          </Col>
          <Col sm="auto">
            <i className={`material-icons-two-tone ${params.icon_color}`}>{params.icon}</i>
          </Col>
        </Row>
        {/* <p className={`mb-0 ${}`}>{params.secondaryText}</p> */}
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = { params: PropTypes.any };
