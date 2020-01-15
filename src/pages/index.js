import React from 'react';
import { Link } from 'gatsby';

import SEO from '../components/layout/SEO';

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <p>Welcome to your new Gatsby site.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </>
);

export default IndexPage;
