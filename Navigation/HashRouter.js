import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function HashRoutes({ ...props }) {
  const hash = useLocation().hash;
  const defaultComponent = props.children.find((c) => c.props.index === true);
  const [selectedComponent, setSelectedComponent] = useState(props.children.find((c) => c.props.hash?.toLowerCase() === decodeURI(hash).toLowerCase()));

  if (props.children.filter((c) => c.props.index === true).length > 1) {
    throw "Only one <HashRoute /> with index (default) is allowed !";
  }

  useEffect(() => {
    setSelectedComponent(props.children.find((c) => c.props.hash?.toLowerCase() === decodeURI(hash).toLowerCase()));
  }, [hash]);

  return hash === "" || hash === "#" ? defaultComponent === undefined ? <></> : defaultComponent : selectedComponent;
}

export function HashRoute({ hash, index = false, element }) {
  if (element === undefined) throw "Must define an element for <HashRoute />";
  return element;
}
