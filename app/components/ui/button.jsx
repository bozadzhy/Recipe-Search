const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed ${
        props.className || ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
