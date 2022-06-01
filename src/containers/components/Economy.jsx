import { memo } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import { createMarkup } from "../../utils";

const Economy = ({ values }) => {
  const history = useHistory();

  const renderImg = (image, description) => <img src={image?.url} alt={description} width="100%" loading="lazy" />;

  const renderDescription = description => <p dangerouslySetInnerHTML={createMarkup(description)} />

  const openPost = id => history.push(`/economy/${id}`);

  const renderPost = (post, index) => {
    const { title, image, description, id } = post;

    return (
      <Col span={24} md={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url ? renderImg(image, description) : renderDescription(description)}
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

Economy.defaultProps = {
  values: []
};

Economy.propTypes = {
  values: PropTypes.array.isRequired,
};

export default memo(Economy);
