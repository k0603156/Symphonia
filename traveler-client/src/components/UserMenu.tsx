import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.li`
  margin: 10px 0;
  text-align: right;
`;
const Box = styled.ul`
  min-width: 100px;
  display: ${(props: { toggle: boolean }) => (props.toggle ? "block" : "none")};
`;

const UserMenu = (props: { toggle: boolean }) => (
  <Box {...props}>
    <Item>
      <Link to="/user">MyPage</Link>
    </Item>
    <Item>
      <Link to="/post">Posting</Link>
    </Item>
    <Item>Logout</Item>
  </Box>
);

export default UserMenu;
