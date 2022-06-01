import { memo } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import { createMarkup } from "../../utils";

const Technology = ({ values }) => {
  const history = useHistory();

  const renderImg = (image, description) => (
    <div>
      <img src={image?.url} alt={description} width="100%" loading="lazy" />
    </div>
  );

  const renderDescription = description => <p dangerouslySetInnerHTML={createMarkup(description)} />

  const openPost = id => history.push(`/technology/${id}`);

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;

    return (
      <Col span={24} md={12} key={`technology-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {renderDescription(description)}
          {image?.url && renderImg(image, description)}
        </article>
      </Col>
    );
  };

  return (
    <Row gutter={[16, 16]}>
      {values?.map(renderPost)}
    </Row>
  );
};

Technology.defaultProps = {
  values: []
};

Technology.propTypes = {
  values: PropTypes.array.isRequired,
};

export default memo(Technology);
