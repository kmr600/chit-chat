import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "./Checkbox";
import { setTheme } from "../actions/settings";

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
`;

const Settings = () => {
  // Redux
  const { theme } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const setThemeAction = useCallback(
    payload => {
      dispatch(setTheme(payload));
    },
    [dispatch]
  );

  const [data, setData] = useState({
    darkMode: theme === "dark" ? true : false,
    background: false
  });

  const { darkMode, background } = data;

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    darkMode ? setThemeAction("dark") : setThemeAction("light");
  }, [darkMode]);

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
              name="background"
              checked={background}
              onChange={e => handleChange(e)}
            />
            <Span>Background</Span>
          </Label>
        </Field>
      </List>
    </Wrapper>
  );
};

export default Settings;
