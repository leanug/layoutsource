const Button = ({ children, type, onClick }) => {
  return (
    type === 'secondary-gray' && (
      <button
       className="h-10 rounded-lg flex justify-start items-start"
       onClick={ onClick }
      >
        <div className="px-4 py-2.5 bg-white rounded-lg shadow border border-gray-300 flex justify-center items-center gap-2">
          <div className="text-slate-700 text-sm font-semibold leading-tight">
            { children }
          </div>
        </div>
      </button>
    )
  );
};

export default Button;
