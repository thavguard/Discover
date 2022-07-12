import { useFormik } from "formik";
import React from "react";
import "./FormItems.scss";

type Props = {};

type Inputs = {
  title: string;
  description: string;
  price: number;
  image: string;
  username: string;
};

const FormItems = (props: Props) => {
  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
      username: "",
    } as Inputs,
    onSubmit: ({ title, description, price, image }: Inputs) => {
      console.log(title, description, price, image);
    },
  });

  return (
    <form className="form-items--container" onSubmit={handleSubmit}>
      <div className="form-items">
        <div className="form-items__input">
          <label htmlFor="">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className="form-items__input">
          <label htmlFor="">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            value={values.description}
          />
        </div>
        <div className="form-items__input">
          <label htmlFor="">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={handleChange}
            value={values.price}
          />
        </div>
        <div className="form-items__input">
          <label htmlFor="">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleChange}
            value={values.image}
          />
        </div>
        <div className="form-items__btn">
          <button className="" type="submit">
            Create item
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormItems;
