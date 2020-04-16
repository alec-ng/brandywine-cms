import React from 'react';
import styled from 'styled-components';

const appbarHeight = '64px';

const EmptyEditorContainer = styled.div`
  display: flex;
  text-align: center;
  height: calc(100vh - ${appbarHeight});
  justify-content: center;
  flex-direction: column;
`;

export const EmptyEditor = () =>
  <EmptyEditorContainer>
      <h1 className="text-muted">
        In the toolbar, select or create a post to modify its contents here.
      </h1>
  </EmptyEditorContainer>

export const ToggleButton = styled.button`
  padding: 5px 20px;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  background: rgba(0, 0, 0, 0);
`;

export const RootContainer = styled.div`
  padding-top: ${appbarHeight};
`;

export const EditorContainer = styled.div`
  height: calc(100vh - ${appbarHeight});
  overflow-y: auto;
`;

export const ToggleVisible = styled.div`
  display: ${props => (props.show ? "inherit" : "none")};
`