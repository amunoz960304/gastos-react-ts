type ErrorProps = {
  error: string;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <p className='bg-red-600 p-2 text-white font-bold text-sm text-center'>
      {error}
    </p>
  );
};

export default Error;
