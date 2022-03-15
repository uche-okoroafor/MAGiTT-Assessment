import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

/**
 * Component to persist the app layout through
 * out different pages.
 * @component
 * @param AppLayoutPops
 * @returns {JSX.Element}
 */

export default function AppLayout({ children }) {
  return (
    <div style={{ paddingTop: "2.7rem" }}>
      <NavBar />
      <Outlet />
    </div>
  );
}
