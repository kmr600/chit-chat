import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Checkbox from "./Checkbox";

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
`;

const Settings = () => {
  // Redux
  // const {darkMode, background} = useSelector(state => state.settings)

  const [settings, setSettings] = useState({
    darkMode: false,
    background: false
  });

  const { darkMode, background } = settings;

  const handleChange = e => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

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
