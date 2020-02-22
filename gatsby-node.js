exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/nfl/)) {
    page.matchPath = '/nfl/*';
    createPage(page);
  } else if (page.path.match(/^\/fantasy/)) {
    page.match = '/fantasy/*';
    createPage(page);
  }
};
