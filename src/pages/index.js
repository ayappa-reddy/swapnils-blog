import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

export default class IndexPage extends Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div style={{ margin: '0 auto', maxWidth: 600 }}>
        {posts.map(({ node: post }) => (
          <div
            key={post.id}
            style={{ border: '1px solid #eee', marginBottom: 20, padding: 20 }}
          >
            <Link to={post.fields.slug}>
              <h1>{post.frontmatter.title}</h1>
            </Link>
            <p> - {post.frontmatter.date}</p>
            <div>
              <p>{post.excerpt}</p>
              <br />
              <br />
              <Link to={post.fields.slug}>Keep Reading</Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt(pruneLength: 400)
        }
      }
    }
  }
`;
