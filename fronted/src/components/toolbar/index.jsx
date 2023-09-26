import { Toolbar } from "primereact/toolbar";

export const ToolbarTable = ({ leftToolbarTemplate, rightToolbarTemplate }) => (
  <Toolbar
    left={leftToolbarTemplate}
    right={rightToolbarTemplate}
    className="my-3"
  />
);
