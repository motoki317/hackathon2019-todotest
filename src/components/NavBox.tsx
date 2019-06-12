import React, { Component } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Page } from '../App';

interface Props {
  pages: Page[];
}
interface State {}

const Nav = styled.div`
  height: 50px;
  border-bottom: 1px solid #eee;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  line-height: 50px;
  padding: 0 25px;
  color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  cursor: pointer;
  float: left;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

class NavBox extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const pageList = this.props.pages.map((page) => {
      return (
        <StyledLink key={page.name} to={page.name}> <FontAwesomeIcon icon={page.icon} /> {page.displayName}</StyledLink>
      );
    });

    return (
      <Nav>
        {pageList}
      </Nav>
    );
  }
}

export default NavBox;