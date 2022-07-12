import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchAuth } from "../../store/slices/auth.slice";
import "./Form.scss";

type Inputs = {
  username: string;
  password: string;
};

const Form = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    } as Inputs,
    onSubmit: ({ username, password }: Inputs) => {
      console.log(username, password);
      dispatch(fetchAuth({ username, password }));
    },
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="form__input">
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="username"
          />
        </div>
        <div className="form__input">
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
          />
        </div>
        <button className="form__btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
