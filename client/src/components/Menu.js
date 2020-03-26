import React, { useCallback } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import { useSelector, useDispatch } from "react-redux";
import { push as BurgerMenu } from "react-burger-menu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Users from "../components/Users";
import Settings from "../components/Settings";
import LogOut from "../icons/LogOut";
import { chatLeave } from "../actions/auth";
import { setMenuIsOpen } from "../actions/menu";

const StyledBurgerMenu = styled(BurgerMenu)`
  .bm-menu-wrap {
    position: fixed;
    min-height: 100%;
    box-shadow: 1px 0px 7px 0px #aaaaaa;
  }
  .bm-menu {
    background: ${props => props.theme.secondaryBgColor};
    padding: 70px;
    min-height: 100%;
  }
  .bm-item-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bm-item {
    display: block;
    outline: none;
  }
  .bm-overlay {
    background: transparent;
    cursor: pointer;
  }
`;

const Title = styled.h3`
  font-size: 36px;
  word-break: break-word;
`;

const LeaveChat = styled.button`
  color: #cc2e21;
  font-size: 15px;
  margin: 40px auto 0;
  display: flex !important;
  align-items: center;

  svg {
    margin-right: 8px;
  }
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
    color: #fff;
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
  const chatLeaveAction = useCallback(() => {
    dispatch(chatLeave());
  }, [dispatch]);

  // logout when leaving chat, and emit an event for others to see who left
  const handleLeave = () => {
    socket.emit("leave");
    chatLeaveAction();
  };

  const { socket } = useSocket();

  return (
    <StyledBurgerMenu
      right
      disableAutoFocus
      onStateChange={state => setMenuIsOpenAction(state.isOpen)}
      isOpen={isOpen}
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

      <LeaveChat onClick={() => handleLeave()}>
        <LogOut /> Leave chat
      </LeaveChat>

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
    </StyledBurgerMenu>
  );
};

export default Menu;
