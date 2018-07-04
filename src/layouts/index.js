import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import { topography } from 'hero-patterns';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  background-image: ${topography('#8817ca', 0.15)};
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  background-color: #fbf0f0;
  max-width: 60rem;
  margin: 0rem auto;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #dfd3d3;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
    box-shadow: none;
  }
`;

const NavLink = StyledLink.extend`
  color: #7c7575;
  font-weight: 600;
  transition: all 0.2s;
  padding: 0.3rem 0.8rem;

  &:hover {
    color: ##dfd3d3;
    border: 1px solid #dfd3d3;
    background-color: #dfd3d3;
  }
`;

const NavBrand = styled.div`
  box-shadow: none;
  font-size: 1.6rem;

  & > * {
    color: #7c7575;

    &:hover {
      text-decoration: none;
    }
  }
`;

const Main = styled.main``;

const Layout = ({ children, data }) => (
  <Wrapper>
    <Container>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: data.site.siteMetadata.description
          }
        ]}
      />
      <Header>
        <NavBar>
          <NavBrand>
            <Link to="/">Swapnil</Link>
          </NavBrand>
          <NavMenu>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog">Blog</NavLink>
            </NavItem>
          </NavMenu>
        </NavBar>
      </Header>
      <Main>{children()}</Main>
    </Container>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
