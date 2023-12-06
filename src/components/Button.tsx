interface ButtonProps {
  onClick?: () => void;
  text: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, icon }) => {
  return (
    <div className='bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 animate-text rounded-lg p-[2px]'>
      <button
        onClick={onClick}
        className='rounded-md p-2 flex items-center justify-center gap-3 hover:px-6 transition-all bg-[#0f172a]'>
        {icon ? <img src={icon} alt={text} className='w-5 h-5' /> : null}
        {text}
      </button>
    </div>
  );
};

export default Button;
