import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { push as BurgerMenu } from "react-burger-menu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Users from "../components/Users";
import Settings from "../components/Settings";
import { setMenuIsOpen } from "../actions/menu";

const BurgerMenuStyles = {
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    boxShadow: "1px 0px 7px 0px #aaaaaa"
    // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
  },
  bmMenu: {
    background: "#fff",
    padding: "70px"
  },
  bmItemList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  bmItem: {
    display: "block",
    outline: "none"
  },
  bmOverlay: {
    background: "transparent",
    cursor: "pointer"
  }
};

const Title = styled.h3`
  font-size: 36px;
  word-break: break-word;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTabList = styled(TabList)`
  margin: 90px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTab = styled(Tab)`
  margin: 0 25px;
  padding: 18px 34px;
  color: ${props => props.theme.linkColor};
  font-size: 22px;
  border-radius: 22px;
  cursor: pointer;
  outline: none;
  user-select: none;
  &.selected {
    color: ${props => (props.theme.type === "light" ? "#fff" : "#000")};
    background-color: ${props => props.theme.purple};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Menu = () => {
  // Redux
  const { username } = useSelector(state => state.auth.user);
  const { isOpen } = useSelector(state => state.menu);
  const dispatch = useDispatch();
  const setMenuIsOpenAction = useCallback(
    payload => {
      dispatch(setMenuIsOpen(payload));
    },
    [dispatch]
  );

  return (
    <BurgerMenu
      right
      disableAutoFocus
      onStateChange={state => setMenuIsOpenAction(state.isOpen)}
      isOpen={isOpen}
      styles={BurgerMenuStyles}
      width={"60vw"}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      customBurgerIcon={false}
      customCrossIcon={false}
    >
      <Title>
        Hi, {username}&nbsp;
        <span role="img" aria-label="wave">
          👋
        </span>
      </Title>

      <StyledTabs selectedTabClassName="selected">
        <StyledTabList>
          <StyledTab>Users</StyledTab>
          <StyledTab>Settings</StyledTab>
        </StyledTabList>

        <StyledTabPanel>
          <Users />
        </StyledTabPanel>
        <StyledTabPanel>
          <Settings />
        </StyledTabPanel>
      </StyledTabs>
    </BurgerMenu>
  );
};

export default Menu;
