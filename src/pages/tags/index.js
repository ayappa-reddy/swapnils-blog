import React from 'react';
import { kebabCase } from 'lodash';
import Link from 'gatsby-link';
import styled from 'styled-components';

const TagList = styled.ul`
  list-style: none;
  margin: 0;

  & > * {
    color: #7c7575;
  }
`;

const TagLink = styled(Link)`
  color: #7c7575;
`;

const TagHeader = styled.h1`
  color: #333;
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <TagHeader>Tags</TagHeader>
    <TagList>
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <TagLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue}
          </TagLink>{' '}
          ({tag.totalCount})
        </li>
      ))}
    </TagList>
  </div>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
