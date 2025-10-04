function TextInput({ id, type, register, error, placeholder }) {
  return (
    <input
      id={id}
      type={type}
      {...register}
      className={`bg-[#ECECF0] rounded-md px-4 py-2 outline-none focus:ring-2 ${
        error ? "focus:ring-[var(--third-color)]" : "focus:ring-black"
      } transition-all duration-300 shadow-sm`}
      placeholder={placeholder}
    />
  );
}

export default TextInput;
