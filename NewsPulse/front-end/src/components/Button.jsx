function Button({ children, type = "button", color, onClick = () => {} }) {
  return (
    <button
      type={type}
      className={`${color} text-white font-semibold px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 capitalize`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
