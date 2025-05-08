import { useEffect } from "react";
import { useAppContext } from "./AppContext";

const Hoverable = ({ children }) => {
  const { setHovered } = useAppContext();

  useEffect(() => {
    setHovered(true);
    return () => setHovered(false); // Restablecer cuando el componente se desmonte
  }, [setHovered]);

  return <div className="hoverable">{children}</div>;
};

export default Hoverable;
