import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "./Checkbox";
import { setTheme, toggleSoundNotifications } from "../actions/settings";
import { clearMessages } from "../actions/chat";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Field = styled.li`
  position: relative;
  margin-bottom: 25px;
  font-size: 15px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Span = styled.span`
  margin-left: 22px;
  font-size: 18px;
  &::selection {
    background: none;
  }
  @media (max-width: 425px) {
    margin-left: 18px;
    font-size: 15px;
  }
`;

const LeaveChat = styled.button`
  margin-top: 15px;
  color: #cc2e21;
  font-size: 15px;
`;

const Settings = () => {
  // Redux
  const { theme, soundNotifications } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const setThemeAction = useCallback(
    payload => {
      dispatch(setTheme(payload));
    },
    [dispatch]
  );
  const toggleNotificationsAction = useCallback(() => {
    dispatch(toggleSoundNotifications());
  }, [dispatch]);
  const clearMessagesAction = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const [data, setData] = useState({
    darkMode: theme === "dark" ? true : false,
    sound: soundNotifications
  });

  const { darkMode, sound } = data;

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    darkMode ? setThemeAction("dark") : setThemeAction("light");
  }, [darkMode]);

  useEffect(() => {
    setData({ ...data, sound: soundNotifications });
  }, [soundNotifications]);

  return (
    <Wrapper>
      <List>
        <Field>
          <Label>
            <Checkbox
              name="darkMode"
              checked={darkMode}
              onChange={e => handleChange(e)}
            />
            <Span>Dark mode</Span>
          </Label>
        </Field>
        <Field>
          <Label>
            <Checkbox
              name="sound"
              checked={sound}
              onChange={() => toggleNotificationsAction()}
            />
            <Span>Sound Notifications</Span>
          </Label>
        </Field>
        <Field>
          <Label>
            <LeaveChat onClick={() => clearMessagesAction()}>
              Clear chat messages
            </LeaveChat>
          </Label>
        </Field>
      </List>
    </Wrapper>
  );
};

export default Settings;
