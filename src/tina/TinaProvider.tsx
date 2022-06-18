import { ReactNode } from "react";
import { tinaConfig } from "../../.tina/schema";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import TinaCMS from "tinacms";

type Props = {
  children: ReactNode;
};
export function TinaProvider({ children }: Props) {
  return (
    <TinaEditProvider
      editMode={<TinaCMS {...(tinaConfig as any)}>{children}</TinaCMS>}
    >
      {children}
    </TinaEditProvider>
  );
}
