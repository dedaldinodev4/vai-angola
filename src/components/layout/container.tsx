import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Largura máxima ~1440px com margens laterais responsivas. */
export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[var(--container-page)] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
