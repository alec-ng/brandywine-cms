import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;

export default function NotFound() {
  const [doRedirect, setDoRedirect] = useState(false);

  useEffect(() => {
    document.title = "Page Not Found";

    window.setTimeout(() => {
      setDoRedirect(true);
    }, 4000);
  }, []);

  return (
    <Container>
      <h1>Page not found</h1>
      <h3 className="text-muted">
        Sorry, this page doesn't exist! You will be redirected back to the home
        page in a couple seconds.
      </h3>
      {doRedirect && <Redirect to="/" />}
    </Container>
  );
}
