import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  target: String;
};

const ActionButton = ({ children, target }: Props) => {
  return (
    <NavLink
      className="rounded-md bg-primary-500 px-10 py-2 text-lg font-semibold text-black hover:bg-secondary-500 hover:text-white"
      to={`${target}`}
    >
      {children}
    </NavLink>
  );
};

export default ActionButton;
