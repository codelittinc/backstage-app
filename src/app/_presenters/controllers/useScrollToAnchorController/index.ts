import { useHashState } from "@/app/_presenters/controllers/useScrollToAnchorController/useHash";
import { useScrollToAnchor } from "@/app/_presenters/controllers/useScrollToAnchorController/useScrollToAnchor";

const useScrollToAnchorController = () => {
  const [hash] = useHashState();
  useScrollToAnchor()(hash);
};

export default useScrollToAnchorController;
