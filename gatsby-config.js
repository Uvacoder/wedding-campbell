require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Laura Gale Campbell and William Tompkins Krakow",
    siteUrl: "https://campbellkrakow.com/",
    description:
      "The official wedding site of Laura Gale and William. Thanks for all your love and support.",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-VJCD2KNJE4",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-transition-link",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "about_images",
        path: "./src/images/about",
      },
      __key: "about_images",
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Guests`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Home`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `About`,
          },
        ],
      },
    },
  ],
};
