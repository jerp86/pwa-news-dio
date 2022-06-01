import { memo, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row } from "antd";

import './style.css'
import api from "../api";
import { createMarkup } from "../utils";
import Actions from "./components/Actions";
import { Link } from "react-router-dom";

const Post = () => {
  const { id, subject } = useParams();
  const history = useHistory();

  const [post, setPost] = useState({});
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderImg = ({ image, description }) => <img src={image?.url} alt={description} loading="lazy" width="75%" />

  const renderText = description => <p dangerouslySetInnerHTML={createMarkup(description)} className="text" />

  const openPost = useCallback(id => history.push(`/${subject}/${id}`), [history, subject]);

  const renderPost = (postListed, index) => {
    const { title, image, description } = postListed;

    return (
      <Col span={24} md={12} key={`post-${index}`}>
        <article onClick={() => openPost(postListed?.id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url ? renderImg({ image, description }) : renderText(description)}
        </article>
        <hr />
      </Col>
    );
  };

  const handleNews = useCallback(data => {
    setNews(data[0]?.value);
    setPost(data[1]?.value);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      api.getNews(subject),
      api.getNewsById(subject, id)
    ]).then(handleNews);
  }, [id, subject, handleNews]);

  if (loading) return <div>Carregando...</div>;

  const { body, datePublished, description, image, title } = post;

  return (
    <div>
      <Link to="/">Back</Link>
      <Actions post={post} subject={subject} />
      <Row gutter={[16, 16]} key={`post-${post?.id}`}>
        <Col span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image?.url && renderImg({ image, description})}
          {renderText(description)}
          <hr />
          {renderText(body)}
        </Col>
        <Col span={24} md={8}>
          <Row gutter={[16, 16]}>
            {news?.value?.map(renderPost)}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Post);
