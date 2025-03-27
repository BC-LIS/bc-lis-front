import { ReactElement } from "react";

export type MenuBarType = {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  isActive: boolean;
};

export interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}
