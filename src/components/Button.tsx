import Loader from "./Loader";
import { ButtonProps } from "../types/types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  icon,
  loading = false,
}) => {
  return (
    <div className='gradient-button rounded-lg p-[2px]'>
      <button
        onClick={onClick}
        className='rounded-md px-4 py-2 flex items-center justify-center gap-2 hover:px-6 transition-all bg-[#0f172a] w-full'>
        {loading ? (
          <Loader />
        ) : (
          icon && <img src={icon} alt='google' className='w-5 h-5' />
        )}
        <span className='text-lg'>{loading ? "Loading..." : `${text}`}</span>
      </button>
    </div>
  );
};

export default Button;
