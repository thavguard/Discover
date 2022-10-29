import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button } from "../../../core-ui/Button/Button";
import { Field } from "../../../core-ui/Field/Field";
import { Input } from "../../../core-ui/Input/Input";
import { TextArea } from "../../../core-ui/TextArea/TextArea";
import styles from "./FormItems.module.scss";
import UploadItemPhoto from "../UploadItemPhoto/UploadItemPhoto";
import { SelectType } from "../SelectType/SelectType";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import {
    createItem,
    fetchItemCharacteristics,
    fetchItemTypes,
} from "../../../../store/slices/items/items.slice";
import { Loader } from "../../../common/Loader/Loader";
import * as Yup from "yup";
import { Invalid } from "../../../core-ui/Invalid/Invalid";
import { createFormData } from "../../../../utils/createFormData";
import ItemCharacteristicInput from "../ItemCharacteristicInput/ItemCharacteristicInput";
import { useNavigate } from "react-router-dom";
import { ICreateItem, IFormItems } from "../../types";

const FormItemsSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "too short!")
        .max(30, "too long!")
        .required("name is required"),
    description: Yup.string()
        .min(5, "too short!")
        .max(500, "too long!")
        .required("description is required"),
    address: Yup.object().shape({
        region: Yup.string(),
        city: Yup.string().required("city is required"),
        street: Yup.string().required("street is required"),
        house: Yup.string(),
        area: Yup.string(),
    }),
    image: Yup.mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "File too large",
            (value) => value && value.size <= 1.5e7
        ),
    itemTypeId: Yup.number()
        .min(1, "item type is required")
        .required("item type is required"),
    info: Yup.array().required("characteristics is required"),
    price: Yup.number()
        .min(10, "min 10!")
        .max(999999999, "too long!")
        .required("price is required"),
    tel: Yup.string().required("phone is required"),
});

type Props = {};

export const FormItems = ({}: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { itemTypes, itemCharacteristics } = useAppSelector(
        (state) => state.items
    );

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
        initialValues: {
            name: "",
            description: "",
            image: {} as File,
            itemTypeId: 0,
            info: [],
            price: 0,
            tel: "",
            address: {
                region: "",
                city: "",
                street: "",
                area: "",
                house: "",
            },
        } as IFormItems,
        validationSchema: FormItemsSchema,
        onSubmit: async (values: IFormItems) => {
            console.log(values);

            const formData = createFormData<ICreateItem>({
                ...values,
                price: values.price.toString(),
                itemTypeId: values.itemTypeId.toString(),
                address: JSON.stringify(values.address),
                info: JSON.stringify(values.info),
            });

            const item = await dispatch(createItem(formData));
            navigate('/item/' + item.id)

        },
    });

    useEffect(() => {
        dispatch(fetchItemTypes());
        console.log(errors);
        console.log(values);
    }, []);

    useEffect(() => {
        dispatch(fetchItemCharacteristics(values.itemTypeId.toString()));
        console.log(itemCharacteristics);
        console.log("update");
    }, [values.itemTypeId]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    if (!itemTypes.length) {
        return <Loader/>;
    }

    console.log(errors);

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <Field label={"photo"}>
                <div className={styles.swiper}>
                    <UploadItemPhoto
                        onChange={({ file, previewUrl }) => {
                            setFieldValue("image", file);
                        }}
                    />
                    {errors.image && touched.image && (
                        <Invalid>{JSON.stringify(errors.image, null, 2)}</Invalid>
                    )}
                </div>
            </Field>
            <Field label="name">
                <Input
                    value={values.name}
                    name="name"
                    placeholder="name"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && touched.name && <Invalid>{errors.name}</Invalid>}
            </Field>
            <Field label="type">
                <SelectType
                    options={itemTypes}
                    onChange={(e) => setFieldValue("itemTypeId", e?.value)}
                    onBlur={handleBlur}
                />
                {errors.itemTypeId && touched.itemTypeId && (
                    <Invalid>{errors.itemTypeId}</Invalid>
                )}
            </Field>
            {!!itemCharacteristics.length && (
                <Field label={"characteristics"}>
                    {itemCharacteristics.map((item, index) => (
                        <ItemCharacteristicInput
                            key={item.id}
                            value={values.info[index]?.description}
                            placeholder={item.title}
                            onChange={(e) =>
                                setFieldValue(`info[${index}]`, {
                                    title: item.title,
                                    description: e.currentTarget.value,
                                })
                            }
                        />
                    ))}
                </Field>
            )}
            <Field label="price">
                <Input
                    value={values.price.toString()}
                    name="price"
                    placeholder="price"
                    id="price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInput={(e) =>
                        (e.currentTarget.value = e.currentTarget.value.replace(
                            /[^0-9]/,
                            ""
                        ))
                    }
                />
                {errors.price && touched.price && <Invalid>{errors.price}</Invalid>}
            </Field>
            <Field label="address">
                <div className={styles.duo}>
                    <Input
                        value={values.address.region}
                        name="address.region"
                        placeholder="region"
                        id="region"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Input
                        value={values.address.city}
                        name="address.city"
                        placeholder="city"
                        id="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                {errors.address?.city && touched.address?.city && (
                    <Invalid>{errors.address?.city}</Invalid>
                )}
            </Field>
            <Field>
                <div className={styles.duo}>
                    <Input
                        value={values.address.street}
                        name="address.street"
                        placeholder="street"
                        id="street"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Input
                        value={values.address.house}
                        name="address.house"
                        placeholder="house"
                        id="house"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                {errors.address?.street && touched.address?.street && (
                    <Invalid>{errors.address?.street}</Invalid>
                )}
            </Field>
            <Field>
                <Input
                    value={values.address.area}
                    name="address.area"
                    placeholder="area"
                    id="area"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Field>
            <Field label="description">
                <TextArea
                    value={values.description}
                    name="description"
                    placeholder="description"
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                    <Invalid>{errors.description}</Invalid>
                )}
            </Field>
            <Field label="phone">
                <Input
                    value={values.tel}
                    name="tel"
                    placeholder="mobile phone"
                    id="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.tel && touched.tel && <Invalid>{errors.tel}</Invalid>}
            </Field>
            <Button disabled={!isValid}>create</Button>
        </form>
    );
};
