const path = require(`path`);
const _ = require(`lodash`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
    });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              tags
              title
              templateKey
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.log(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({ node }, index) => {
      const { id, fields, frontmatter } = node;

      const next = index === posts.length - 1 ? false : posts[index + 1].node;
      const previous = index === 0 ? false : posts[index - 1].node;

      const blogPostTemplate = path.resolve(
        `src/templates/${String(frontmatter.templateKey)}.js`,
      );

      createPage({
        path: fields.slug,
        tags: frontmatter.tags,
        component: blogPostTemplate,
        // additional data passed via context is available as graphql variables
        context: {
          id,
          previous,
          next,
        },
      });
    });

    // Tag pages:
    let tags = [];

    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(({ node }) => {
      if (_.get(node, `frontmatter.tags`)) {
        tags = tags.concat(node.frontmatter.tags);
      }
    });

    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;
      const tagTemplate = path.resolve(`src/templates/tags.js`);

      createPage({
        path: tagPath,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });
  });
};
