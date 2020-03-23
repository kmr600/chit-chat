import React, { useCallback } from "react";
import { push as BurgerMenu } from "react-burger-menu";
import { useSelector, useDispatch } from "react-redux";
import { setMenuIsOpen } from "../actions/menu";

const BurgerMenuStyles = {
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em"
  },
  bmItem: {
    display: "block"
  },
  bmOverlay: {
    background: "transparent",
    cursor: "pointer"
  }
};

const Menu = () => {
  // Redux
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
      width={"50vw"}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      customBurgerIcon={false}
      customCrossIcon={false}
    >
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </BurgerMenu>
  );
};

export default Menu;
