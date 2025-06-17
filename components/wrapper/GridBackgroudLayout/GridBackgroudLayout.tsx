import { ReadOnlyChildren } from "@/utils/types";

const GridBackgroudLayout = ({ children }: ReadOnlyChildren) => (
  <div className="w-full h-auto">
    {children}
  </div>
);

export default GridBackgroudLayout;
