import React, { Component } from "react";
import styled from "styled-components";

interface Props {
  pages: Page[];
  onSelect: Function;
}
interface State {}

const Nav = styled.div`
  height: 50px;
  border-bottom: 1px solid #eee;
`;

const StyledButton = styled.div`
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
  render() {
    const pageList = this.props.pages.map((page) => {
      return (
        <StyledButton key={page.name} onClick={() => this.props.onSelect(page.name)}>{page.displayName}</StyledButton>
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