import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { kebabCase } from 'lodash';
import Content, { HTMLContent } from '../components/Content';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

const Post = styled.article``;

const Heading1 = styled.h1`
  text-align: center;
  color: #333;
`;

const Date = styled.p`
  text-align: center;
  color: #333;
`;

const Tags = styled.section`
  margin-bottom: 1.5rem;
`;

const TagHeading = styled.h4`
  letter-spacing: 0.4rem;
  color: #333;
`;

const TagList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
`;

const TagItem = styled.li`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const TagLink = styled(Link)`
  color: #333;
`;

const PostsMenu = TagList.extend`
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 1.5rem;
`;

const PostLink = styled(Link)`
  color: #333;
`;

const Divider = styled.div`
  border-bottom: 1px solid #dfd3d3;
  margin-bottom: 1.5rem;
`;

export const BlogPostTemplate = ({
  title,
  date,
  description,
  content,
  contentComponent,
  tags,
  previousPost,
  nextPost,
  disqusConfig
}) => {
  const PostContent = contentComponent || Content;

  return (
    <Post>
      <Heading1>{title}</Heading1>
      <Date>{date}</Date>
      <p>{description}</p>
      <PostContent content={content} />
      <Divider />
      <PostsMenu>
        {previousPost && (
          <li>
            &larr;{' '}
            <PostLink to={previousPost.fields.slug} rel="prev">
              {previousPost.frontmatter.title}
            </PostLink>
          </li>
        )}

        {nextPost && (
          <li>
            <PostLink to={nextPost.fields.slug} rel="next">
              {nextPost.frontmatter.title}
            </PostLink>{' '}
            &rarr;
          </li>
        )}
      </PostsMenu>
      {tags && tags.length ? (
        <Tags>
          <TagHeading>Tags:</TagHeading>
          <TagList>
            {tags.map(tag => (
              <TagItem key={tag + `tag`}>
                <TagLink to={`/tags/${kebabCase(tag)}`}>{tag}</TagLink>
              </TagItem>
            ))}
          </TagList>
        </Tags>
      ) : null}
      <DiscussionEmbed shortname={'swapnils-blog'} config={disqusConfig} />
    </Post>
  );
};

BlogPostTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
};

const BlogPost = props => {
  const { markdownRemark: post } = props.data;
  const { previous, next } = props.pathContext;
  const disqusConfig = {
    identifier: props.pathContext.id,
    title: post.frontmatter.title,
  };
  return (
    <BlogPostTemplate
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      description={post.frontmatter.description}
      content={post.html}
      contentComponent={HTMLContent}
      tags={post.frontmatter.tags}
      previousPost={previous}
      nextPost={next}
      disqusConfig={disqusConfig}
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
