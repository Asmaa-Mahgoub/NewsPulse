import { useForm } from "react-hook-form";

import FormRow from "../../components/FormRow";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import TextInput from "../../components/TextInput";
import { useState } from "react";

function Login() {
  const [errorMessage, setErrorMessage] = useState();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const navigate = useNavigate();

  async function onSubmit({ username, password, role }) {
    password = String(password);

    const response = await login({ username, password, role });

    if (response.success) {
      navigate("/adminpage");
      reset();
    }
    if (response.message) {
      setErrorMessage((errorMessage) => (errorMessage = response.message));
    }
  }

  return (
    <div className="w-[90%] sm:w-[66%] md:w-[56%] lg:w-[40%] xl:w-[32%] mx-auto">
      <Form handleSubmit={handleSubmit(onSubmit)}>
        <FormRow
          id="username"
          label="username"
          type="text"
          error={errors.username}
        >
          <TextInput
            id="username"
            type="text"
            register={register("username", {
              required:
                " 150 characters or fewer. Letters, digits and @/./+/-/_ only !",
            })}
            error={errors.username}
            placeholder="username"
          />
        </FormRow>

        <FormRow id="password" type="password" error={errors.password}>
          <TextInput
            id="password"
            type="password"
            register={register("password", {
              required: "This field is required !",
            })}
            error={errors.password}
            placeholder="********"
          />
        </FormRow>

        <select
          id="role"
          {...register("role", { required: "This field is required !" })}
          className={`border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2  w-fit cursor-pointer`}
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
        </select>

        {errorMessage && (
          <p className="text-center text-sm font-semibold text-[var(--third-color)]">
            {errorMessage}
          </p>
        )}

        <Button type="submit" color="bg-[var(--third-color)]">
          login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
