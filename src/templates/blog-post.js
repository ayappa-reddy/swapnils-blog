import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <Link to={'/'}>Home</Link>
    </div>
  );
};

BlogPost.PropTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
      html
    }
  }
`;
