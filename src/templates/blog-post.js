import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import Content, { HTMLContent } from '../components/Content';

export const BlogPostTemplate = ({
  title,
  date,
  description,
  content,
  contentComponent,
  tags,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>{description}</p>
      <PostContent content={content} />
      {tags && tags.length ? (
        <div style={{ marginTop: `4rem` }}>
          <h4>Tags</h4>
          <ul>
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

BlogPostTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <BlogPostTemplate
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      description={post.frontmatter.description}
      content={post.html}
      contentComponent={HTMLContent}
      tags={post.frontmatter.tags}
    />
  );
};

BlogPost.propTypes = {
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
