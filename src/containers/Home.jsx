import React, { memo, useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';

import api from '../api';
import Economy from './components/Economy';
import Technology from './components/Technology';
import World from './components/World';

const { Title } = Typography;

const Home = () => {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNews = articles => {
    setLoading(false);
    setNews({
      economy: articles[0]?.value?.value,
      technology: articles[1]?.value?.value,
      world: articles[2]?.value?.value,
    });
  };

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      api.getNews('economy'),
      api.getNews('technology'),
      api.getNews('world'),
    ]).then(handleNews);
  }, []);

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <Title level={2}>World</Title>
          <World values={news?.world} />
        </Col>
        <Col span={24} md={8}>
          <Title level={2}>Economy</Title>
          <Economy values={news?.economy} />
        </Col>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>Technology</Title>
          <Technology values={news?.technology} />
        </Col>
      </Row>
    </div>
  );
}

export default memo(Home);
