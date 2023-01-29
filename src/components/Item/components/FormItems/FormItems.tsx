import { useFormik } from "formik";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../../../core-ui/Button/Button";
import { Field } from "../../../core-ui/Field/Field";
import { Input } from "../../../core-ui/Input/Input";
import { TextArea } from "../../../core-ui/TextArea/TextArea";
import styles from "./FormItems.module.scss";
import UploadItemPhoto from "../UploadItemPhoto/UploadItemPhoto";
import { SelectType } from "../SelectType/SelectType";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { createItem, fetchItemCharacteristics, } from "../../slice/items.slice";
import { Loader } from "../../../common/Loader/Loader";
import * as Yup from "yup";
import { Invalid } from "../../../core-ui/Invalid/Invalid";
import { createFormData } from "../../../../utils/createFormData";
import ItemCharacteristicInput from "../ItemCharacteristicInput/ItemCharacteristicInput";
import { useNavigate } from "react-router-dom";
import { ICreateItem, IFormItems } from "../../types";
import urls from 'settings/urls.json'
import classNames from "classnames";

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
    const [itemSubmit, setItemSubmit] = useState<boolean>(false)
    const [step, setStep] = useState<number>(0)
    const [isError, setIsError] = useState<boolean>(false)

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
        onSubmit: () => {
        },

    });

    useEffect(() => {
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

    const nextStep = () => {
        if (step + 1 <= 2) {
            setStep(prev => prev + 1)
        }
    }
    const prevStep = () => {
        if (step - 1 >= 0) {
            setStep(prev => prev - 1)
        }
    }

    const onNextStep = () => {
        switch (step) {
            case 0:
                if (errors.image || errors.name || errors.itemTypeId) {
                    setIsError(true)
                } else {
                    nextStep()
                    setIsError(false)
                }
                break

            case 1:
                if (errors.price || errors.address) {
                    setIsError(true)
                } else {
                    nextStep()
                    setIsError(false)
                }
                break

            case 2:
                if (errors.description || errors.tel) {
                    setIsError(true)
                } else {
                    onSubmit()
                    setIsError(false)
                }
                break

        }
    }

    const onSubmit = async () => {
        setItemSubmit(true)
        console.log(values);

        const formData = createFormData<ICreateItem>({
            ...values,
            price: values.price.toString(),
            itemTypeId: values.itemTypeId.toString(),
            address: JSON.stringify(values.address),
            info: JSON.stringify(values.info),
            wasCreated: Date.now()
        });

        const item = await dispatch(createItem(formData));
        navigate(urls.item.root + item.id)

        setItemSubmit(false)


    }


    if (!itemTypes.length) {
        return <Loader/>;
    }

    // @ts-ignore
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            {step === 0 && <>
                <Field label={"photo"}>
                    <div className={styles.photo}>
                        <UploadItemPhoto
                            onChange={({ file, previewUrl }) => {
                                setFieldValue("image", file);
                            }}
                        />
                        {errors.image && isError && (
                            <Invalid>{JSON.stringify(errors.image, null, 2)}</Invalid>
                        )}
                    </div>
                </Field>
                <Field label="Name">
                    <Input
                        value={values.name}
                        name="name"
                        placeholder="Name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && isError && <Invalid>{errors.name}</Invalid>}
                </Field>
                <Field label="Type">
                    <SelectType
                        options={itemTypes}
                        onChange={(e) => setFieldValue("itemTypeId", e.toString())}
                        onBlur={handleBlur}
                    />
                    {errors.itemTypeId && isError && (
                        <Invalid>{errors.itemTypeId}</Invalid>
                    )}
                </Field></>}

            {step === 1 && <>
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
                <Field label="Price">
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
                    {errors.price && isError && <Invalid>{errors.price}</Invalid>}
                </Field>
                <Field label="Address">
                    <div className={styles.duo}>
                        <Input
                            value={values.address.region}
                            name="address.region"
                            placeholder="Region"
                            id="region"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Input
                            value={values.address.city}
                            name="address.city"
                            placeholder="City"
                            id="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.address?.city && isError && (
                        <Invalid>{errors.address?.city}</Invalid>
                    )}
                </Field>
                <Field>
                    <div className={styles.duo}>
                        <Input
                            value={values.address.street}
                            name="address.street"
                            placeholder="Street"
                            id="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Input
                            value={values.address.house}
                            name="address.house"
                            placeholder="House number"
                            id="house"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.address?.street && isError && (
                        <Invalid>{errors.address?.street}</Invalid>
                    )}
                </Field>
                <Field>
                    <Input
                        value={values.address.area}
                        name="address.area"
                        placeholder="Area"
                        id="area"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Field>
            </>}


            {step === 2 && <>  <Field label="Description">
                <TextArea
                    value={values.description}
                    name="description"
                    placeholder="Description"
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.description && isError && (
                    <Invalid>{errors.description}</Invalid>
                )}
            </Field>
                <Field label="Phone">
                    <Input
                        value={values.tel}
                        name="tel"
                        placeholder="Phone number"
                        id="tel"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.tel && isError && <Invalid>{errors.tel}</Invalid>}
                </Field></>}


            <div className={classNames([styles.duo, styles.footer])}>
                {step !== 0 && <Button fullwidth onClick={prevStep} variant={'outlined'}>Prev</Button>}
                <Button fullwidth onClick={onNextStep} variant={'black'}>{step === 2 ? 'Create' : 'Next'}</Button>

            </div>
        </form>
    );
};
