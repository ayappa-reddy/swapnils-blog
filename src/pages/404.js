import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
  & > * {
    color: #333;
  }
`;

const NotFoundPage = () => (
  <Error>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Error>
);

export default NotFoundPage;
