import React from "react";
import "./Title.scss";

type Props = {
  title: string;
  text: string;
};

const Title = ({ title, text }: Props) => {
  return (
    <div className="title">
      <div className="title__welcome">{title}</div>
      <div className="title__products">{text}</div>
    </div>
  );
};

export default Title;
