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
import { Provider } from "react-redux";
import store from "./store";

const lightTheme = () => ({
  ...themes["common"],
  ...themes["light"]
});

const darkTheme = () => ({
  ...themes["common"],
  ...themes["dark"]
});

const App = () => {
  // get theme from local storage
  const [defaultTheme, setDefaultTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  // set current theme to defaulted theme
  const [currentTheme, setCurrentTheme] = useState(
    defaultTheme === "dark" ? darkTheme() : lightTheme()
  );
  // save theme in local storage
  useEffect(() => {
    if (currentTheme) localStorage.setItem("theme", currentTheme.type);
  }, [currentTheme]);

  return (
    <Provider store={store}>
      <SocketIOProvider url="http://localhost:5000">
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
    </Provider>
  );
};

export default App;
