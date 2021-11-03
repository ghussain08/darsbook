import React from "react";
import styled from "styled-components";

const SiteContainerComponent = styled.section`
  font-family: "Public Sans, sans-serif";
`;

export default function SiteContainer(props: { children: React.ReactNode }) {
  return <SiteContainerComponent>{props.children}</SiteContainerComponent>;
}
