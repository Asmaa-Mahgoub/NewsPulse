import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import FormRow from "../../components/FormRow";
import Button from "../../components/Button";
import Form from "../../components/Form";
import { useAuth } from "../../context/AuthContext";
import TextInput from "../../components/TextInput";

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const { signup } = useAuth();

  const navigate = useNavigate();

  async function onSubmit({ username, email, password, role }) {
    password = String(password);

    // const response = await signup({ email, username, password, role });

    // if (response.success) {
    //   navigate("/");
    //   reset();
    // }

    // if (response.message.username) {
    //   setError("username", {
    //     type: "server",
    //     message: response.message.username[0],
    //   });
    // }

    // if (response.message.email) {
    //   setError("email", {
    //     type: "server",
    //     message: response.message.email[0],
    //   });
    // }
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

        <FormRow id="email" label="email" type="email" error={errors.email}>
          <TextInput
            id="email"
            type="email"
            register={register("email", {
              required: "This field is required !",
            })}
            error={errors.email}
            placeholder="someone@gmail.com"
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

        <Button type="submit" color="bg-green-600 hover:bg-green-700">
          sign up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
