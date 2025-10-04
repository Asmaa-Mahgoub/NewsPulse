function FormRow({ children, label, id, type, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`text-sm font-medium  capitalize ${
          error ? "third-color" : "text-[#3E445A]"
        }`}
      >
        {label || type}
      </label>

      {children}

      {error && (
        <span className="text-xs font-bold w-max px-2 py-1 third-color bg-red-100 rounded-md ">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default FormRow;
