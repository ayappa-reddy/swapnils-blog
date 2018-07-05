module.exports = {
  siteMetadata: {
    title: `Swapnil's Blog`,
    description: `The blog of Aerospace Engineer, Swapnil Maddula`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Swapnil's Blog",
        short_name: 'Swapnil',
        start_url: '/',
        background_color: 'white',
        theme_color: '#fbf0f0',
        display: 'minimal-ui',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img/`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-manifest`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
};
