import React from "react";
import Canvas from "./Canvas/Canvas";
import CanvasWrapper from "./Canvas/CanvasWrapper";

const AppLayout = () => {
  return (
    <section className="app-layout">
      <div>
        <h1 className="distance-title">Closest confired distance: </h1>
        <CanvasWrapper>
          <Canvas />
        </CanvasWrapper>
      </div>
      <div>
        <h1>Violations</h1>
      </div>
    </section>
  );
};

export default AppLayout;
