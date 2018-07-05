import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';
import 'typeface-open-sans';
import 'typeface-roboto';

const LatestPosts = styled.section``;

const Heading3 = styled.h3`
  color: #333;
  letter-spacing: 0.3rem;
  display: inline-block;
`;

const PostsPreview = styled.section``;

const PostPreview = styled.article`
  border-bottom: 1px solid #dfd3d3;
  padding: 1rem 0;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const PostHeader = styled.header``;
const PostInfo = styled.section``;

const PostDate = styled.h3`
  color: #7c7575;
`;
const PostHeading = styled.h1``;
const PostLink = styled(Link)`
  color: #333;
`;
const PostExcerpt = styled.p``;

export default class IndexPage extends Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <LatestPosts>
        <Heading3>Latest Posts</Heading3>
        <PostsPreview>
          {posts.map(({ node: post }) => (
            <PostPreview key={post.id}>
              <PostHeader>
                <PostDate>{post.frontmatter.date}</PostDate>
                <PostHeading>
                  <PostLink to={post.fields.slug}>
                    {post.frontmatter.title}
                  </PostLink>
                </PostHeading>
              </PostHeader>

              <PostInfo>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <PostLink to={post.fields.slug}>Keep Reading</PostLink>
              </PostInfo>
            </PostPreview>
          ))}
        </PostsPreview>
      </LatestPosts>
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
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`;
