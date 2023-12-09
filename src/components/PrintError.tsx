import { ErrorType } from "../types/types";
import errorSVG from "../assets/icons/error.svg";

interface PrintErrorProps {
  error?: ErrorType;
}

function PrintError({ error }: PrintErrorProps): JSX.Element {
  return (
    <span className='border border-red-600 text-red-600 rounded-md p-2 inline-flex gap-3'>
      <img src={errorSVG} alt='error' className='w-5' />
      <span>{error?.message}</span>
    </span>
  );
}

export default PrintError;
