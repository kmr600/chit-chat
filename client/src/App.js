import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { SocketIOProvider } from "use-socketio";
import PrivateRoute from "./components/PrivateRoute";
import GlobalStyle from "./styles/global";
import { themes } from "./styles/themes";
import Home from "./routes/Home";
import Chatroom from "./routes/Chatroom";
import LoadingScreen from "./components/LoadingScreen";
// Redux
import { useSelector } from "react-redux";

const lightTheme = () => ({
  ...themes["common"],
  ...themes["light"]
});

const darkTheme = () => ({
  ...themes["common"],
  ...themes["dark"]
});

const App = () => {
  // Redux
  const { theme } = useSelector(state => state.settings);

  // set current theme
  const [currentTheme, setCurrentTheme] = useState(
    theme === "dark" ? darkTheme() : lightTheme()
  );
  // save theme in local storage
  useEffect(() => {
    setCurrentTheme(theme === "dark" ? darkTheme() : lightTheme());
  }, [theme]);

  return (
    <SocketIOProvider url="/">
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />

        <LoadingScreen />

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/chat" component={Chatroom} />
          </Switch>
        </Router>
      </ThemeProvider>
    </SocketIOProvider>
  );
};

export default App;
