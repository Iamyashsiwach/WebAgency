import { ReadOnlyChildren } from "@/utils/types";

const MainComponent = ({ children }: ReadOnlyChildren) => (
  <main id='agency-main' className="flex flex-col items-center">
    {children}
  </main>
);

export default MainComponent;
