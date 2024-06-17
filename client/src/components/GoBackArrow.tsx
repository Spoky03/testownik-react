import { IoMdArrowRoundBack as ArrowBackIcon } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export const GoBackArrow = ({ to }: { to?: string | number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === 'string') {
      navigate(to); // For string, navigate to the path
    } else if (typeof to === 'number') {
      navigate(to); // For number, navigate the number of steps in the history stack
    } else {
      navigate('..'); // Default to navigating back
    }
  };

  return (
    <div className="flex justify-start">
      <ArrowBackIcon
        onClick={handleClick}
        className="place-self-start"
        size={25}
      />
    </div>
  );
};