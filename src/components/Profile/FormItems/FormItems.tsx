import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { ICreateItem } from "../../../store/types";
import { Button } from "../../core-ui/Button/Button";
import { Field } from "../../core-ui/Field/Field";
import { Input } from "../../core-ui/Input/Input";
import { TextArea } from "../../core-ui/TextArea/TextArea";
import styles from "./FormItems.module.scss";
import UploadItemPhoto from "../UploadItemPhoto/UploadItemPhoto";
import { Swiper, SwiperSlide } from "swiper/react";
import { SelectType } from "../SelectType/SelectType";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { createItem, fetchItemTypes } from "../../../store/slices/items.slice";
import { Loader } from "../../common/Loader/Loader";
import * as Yup from "yup";
import { Invalid } from "../../core-ui/Invalid/Invalid";

const FormItemsShema = Yup.object().shape({
  name: Yup.string()
    .min(2, "too short!")
    .max(30, "too long!")
    .required("name is required"),
  description: Yup.string()
    .min(5, "too short!")
    .max(500, "too long!")
    .required("description is required"),
  address: Yup.string()
    .min(5, "too short!")
    .max(30, "too long!")
    .required("address is required"),
  image: Yup.object().required("image is required"),
  price: Yup.number()
    .min(10, "min 10!")
    .max(999999999, "too long!")
    .required("price is required"),
  info: Yup.array(),
});

type Props = {};

export const FormItems = (props: Props) => {
  const dispatch = useAppDispatch();

  const { itemTypes } = useAppSelector((state) => state.items);

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    isValid,
    handleBlur,
  } = useFormik({
    validationSchema: FormItemsShema,
    initialValues: {
      name: "",
      description: "",
      address: "",
      image: {} as File,
      itemTypeId: 0,
      price: 0,
      info: [],
    } as ICreateItem,
    onSubmit: ({
      address,
      description,
      image,
      info,
      itemTypeId,
      name,
      price,
    }: ICreateItem) => {
      console.log({
        address,
        description,
        image,
        info,
        itemTypeId,
        name,
        price,
      });
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      // formData.append("itemTypeId", itemTypeId.toString());
      formData.append("itemTypeId", "1");
      formData.append(
        "info",
        JSON.stringify([{ title: "Диагональ экрана", description: "6.67" }])
      );
      formData.append("address", address);

      dispatch(createItem(formData));

      console.log({
        address,
        description,
        image,
        info,
        itemTypeId,
        name,
        price,
      });
    },
  });

  useEffect(() => {
    dispatch(fetchItemTypes());
  }, []);

  if (!itemTypes.length) {
    return <Loader />;
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Field label={"photo"}>
        <div className={styles.swiper}>
          <UploadItemPhoto
            onChange={({ file, previewUrl }) => {
              setFieldValue("image", file);
            }}
          />
          {!!errors.image && !!touched.image && (
            <Invalid>{JSON.stringify(errors.image, null, 2)}</Invalid>
          )}
        </div>
      </Field>
      <Field label="name">
        <Input
          name="name"
          placeholder="name"
          id="name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {!!errors.name && !!touched.name && <Invalid>{errors.name}</Invalid>}
      </Field>
      <Field label="type">
        <SelectType options={itemTypes} />
        {!!errors.itemTypeId && !!touched.itemTypeId && (
          <Invalid>{errors.itemTypeId}</Invalid>
        )}
      </Field>
      <Field label="price">
        <Input
          name="price"
          placeholder="price"
          id="price"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {!!errors.price && !!touched.price && <Invalid>{errors.price}</Invalid>}
      </Field>
      <Field label="address">
        <Input
          name="address"
          placeholder="address"
          id="address"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {!!errors.address && !!touched.address && (
          <Invalid>{errors.address}</Invalid>
        )}
      </Field>
      <Field label="description">
        <TextArea
          name="description"
          placeholder="description"
          id="description"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {!!errors.description && !!touched.description && (
          <Invalid>{errors.description}</Invalid>
        )}
      </Field>
      <Button disabled={!isValid}>create</Button>
    </form>
  );
};
