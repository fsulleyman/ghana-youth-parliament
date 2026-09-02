import type { FC } from "react";

export const SkipToContent: FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#187B28] focus:text-white focus:font-bold focus:rounded focus:shadow-md"
    >
      Skip to main content
    </a>
  );
};
