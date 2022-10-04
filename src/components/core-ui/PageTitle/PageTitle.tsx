import React from "react";
import "./PageTitle.scss";

type Props = {
  title: string;
  text: string;
};

export const PageTitle = ({ title, text }: Props) => {
  return (
    <div className="title">
      <div className="title__welcome">{title}</div>
      <div className="title__products">{text}</div>
    </div>
  );
};
