import type * as React from "react";

export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children?: React.ReactNode;
}

export interface WithStyle {
  style?: React.CSSProperties;
}

export interface ComponentBaseProps extends WithClassName, WithStyle {
  id?: string;
  "aria-label"?: string;
  "data-testid"?: string;
}
