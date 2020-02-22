exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/nfl/)) {
    page.matchPath = '/nfl/*';
    createPage(page);
  }
};
