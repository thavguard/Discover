import { useFormik } from "formik";
import React from "react";
import { Button } from "../../core-ui/Button/Button";
import "./FormItems.scss";

type Props = {};

type Inputs = {
  title: string;
  description: string;
  price: number;
  image: string;
  username: string;
  address: string;
};

export const FormItems = (props: Props) => {
  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
      username: "",
      address: "",
    } as Inputs,
    onSubmit: ({ title, description, price, image, address }: Inputs) => {
      console.log(title, description, price, image, address);
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
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            value={values.image}
          />
        </div>
        <div className="form-items__input">
          <label htmlFor="">address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange}
            value={values.address}
          />
        </div>
        <div className="form-items__btn">
          <Button>Add item</Button>
        </div>
      </div>
    </form>
  );
};
