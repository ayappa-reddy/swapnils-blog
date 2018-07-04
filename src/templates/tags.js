import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const TagList = styled.ul`
  list-style: none;
  margin: 0;
`;

const TagLink = styled(Link)`
  color: #333;
`;

const BrowseTagsLink = TagLink.extend``;

const TagTitle = styled.h3`
  color: #7c7575;
`;

const TagHeader = styled.h1`
  color: #333;
`;

class TagRoute extends Component {
  render() {
    const { data, pathContext } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    const postLinks = posts.map(({ node: post }) => (
      <li key={post.fields.slug}>
        <TagLink to={post.fields.slug}>
          <TagTitle>{post.frontmatter.title}</TagTitle>
        </TagLink>
      </li>
    ));

    const tag = pathContext.tag;
    // const title = data.site.siteMetadata.title;
    const totalcount = data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalcount} post${
      totalcount === 1 ? '' : 's'
    } tagged with “${tag}”`;

    return (
      <div>
        <TagHeader>{tagHeader}</TagHeader>
        <TagList>{postLinks}</TagList>
        <p>
          <BrowseTagsLink to="/tags/">Browse all tags</BrowseTagsLink>
        </p>
      </div>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
