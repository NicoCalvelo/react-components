import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function HashRoutes({ dependencies, ...props }) {
  // If set dependencies must be an array
  if (dependencies != undefined && typeof dependencies != "object") throw "dependencies must be an array !";
  const hash = useLocation().hash;
  if (props.children.filter((c) => c.props?.index === true).length > 1) {
    throw "Only one index <HashRoute /> (default) is allowed !";
  }
  const defaultComponent = props.children.find((c) => c.props?.index === true);
  const [selectedComponent, setSelectedComponent] = useState(props.children.find((c) => c.props.hash?.toLowerCase() === decodeURI(hash).toLowerCase()));

  useEffect(() => {
    setSelectedComponent(props.children.find((c) => c.props.hash?.toLowerCase() === decodeURI(hash).toLowerCase()));
  }, [hash, ...(dependencies ?? [])]);

  return hash === "" || hash === "#" ? defaultComponent === undefined ? <></> : defaultComponent : selectedComponent;
}

export function HashRoute({ hash, index = false, element }) {
  if (element === undefined) throw "Must define an element for <HashRoute />";
  return element;
}
