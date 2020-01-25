import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export const VARIATION_DEFAULT = "markdown_default";

export function MarkdownElement(props) {
  return (
    <div className="mx-auto brandywine-responsive-x-padding brandywine-width_large py-3">
      {props.baseAttrs.source ? (
        <ReactMarkdown
          source={props.baseAttrs.source}
          renderers={{
            table: Table,
            blockquote: Blockquote
          }}
        />
      ) : (
        <h6 className="text-center text-muted">
          Markdown will be rendered here
        </h6>
      )}
    </div>
  );
}

const Table = function(props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        {props.children}
      </table>
    </div>
  );
};

const Blockquote = function(props) {
  return <StyledBlockquote>{props.children}</StyledBlockquote>;
};

// Modified from https://codepen.io/johnfinkdesign/pen/gRvEGq
const StyledBlockquote = styled.blockquote`
  border-left: 2px solid rgb(255, 69, 0);
  font-style: italic;
  line-height: 1.8em;
  padding: 1em 2em;
  position: relative;
  transition: 0.2s border ease-in-out;
  z-index: 0;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -4px;
    height: 2em;
    background-color: white;
    width: 5px;
    margin-top: -1em;
  }
  &:after {
    content: "\\201D";
    position: absolute;
    font-family: Inria Serif;
    font-size: 40px;
    top: 50%;
    left: -0.5em;
    color: rgb(255, 69, 0);
    font-style: normal;
    line-height: 1em;
    text-align: center;
    text-indent: -2px;
    width: 1em;
    margin-top: -0.33em;
    transition: 0.2s all ease-in-out, 0.4s transform ease-in-out;
  }
  &.format:before,
  &.format:after {
    display: none;
  }
  &.book:after {
    content: "\\201D";
  }
  &.podcast:after {
    content: "\\201D";
  }
  &.lyrics:after {
    content: "\\201D";
  }
  &.favorite:after {
    content: "\\201D";
  }
  &:active:after {
    transform: rotateY(360deg);
  }
  & cite {
    display: block;
    line-height: 1.8em;
    margin-top: 1em;
  }

  @media (max-width: 767px) {
    border-top: 1px solid rgb(255, 69, 0);
    border-left: none;
    padding: 1.5em 1em;
    &:before {
      left: 50%;
      top: 0;
      height: 4px;
      margin-top: -3px;
      margin-left: -1em;
      width: 2em;
    }
    &:after {
      left: 50%;
      top: 0;
      margin-top: -0.33em;
      margin-left: -0.5em;
    }
    & cite {
      text-align: right;
    }
  }
`;
