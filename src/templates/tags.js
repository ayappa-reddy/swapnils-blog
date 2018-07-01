import React, { Component } from 'react';
import Link from 'gatsby-link';

class TagRoute extends Component {
  render() {
    const { data, pathContext } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    const postLinks = posts.map(({ node: post }) => (
      <li key={post.fields.slug}>
        <Link to={post.fields.slug}>
          <h2>{post.frontmatter.title}</h2>
        </Link>
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
        <h1>{tagHeader}</h1>
        <ul>{postLinks}</ul>
        <p>
          <Link to="/tags/">Browse all tags</Link>
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
