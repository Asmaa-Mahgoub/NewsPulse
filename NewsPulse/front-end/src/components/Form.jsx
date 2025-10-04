import Logo from "./Logo";

function Form({ children, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-6 bg-white rounded-xl shadow-lg text-base md:text-lg text-[#3E445A]"
    >
      <div className="w-fit mx-auto">
        <Logo />
      </div>

      {/* <div className="bg-[#ECECF0] p-1 rounded-xl flex justify-between text-center font-semibold">
        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            `w-[50%] rounded-xl ${isActive ? "bg-white" : ""}`
          }
        >
          Login
        </NavLink>

        
      </div> */}

      {children}
    </form>
  );
}

export default Form;
