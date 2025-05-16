import { useAppContext } from "./AppContext";

const Writable = ({ children }) => {
  const { setIsWriting } = useAppContext();

  const handleMouseEnter = () => setIsWriting(true);
  const handleMouseLeave = () => setIsWriting(false);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

export default Writable;
