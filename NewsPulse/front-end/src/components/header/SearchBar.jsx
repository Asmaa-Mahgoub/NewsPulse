import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  function onSubmit({ query }) {
    if (!query.trim()) {
      reset();
    } else {
      navigate(`/searchresultpage/${query}`);
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-evenly w-full lg:w-[62%] rounded-md px-3 py-2 bg-gray-100 border-gray-300 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-lg"
    >
      <label htmlFor="search" className="flex flex-col justify-center">
        <IoSearch className="text-2xl third-color" />
      </label>
      <input
        type="text"
        id="search"
        {...register("query")}
        placeholder="Looking for something specific?"
        className="w-[90%] outline-0"
      />
    </form>
  );
}

export default SearchBar;
