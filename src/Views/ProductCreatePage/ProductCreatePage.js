import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import * as Yup from 'yup';
import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import classes from './productCreate.module.css';
import TextError from '../../components/TextError';
import { storeContext } from '../../contexts/StoreContext';
import { notifySuccess } from '../../helpers/notifiers';
import { useHistory } from 'react-router';

export default function ProductCreatePage() {
  const { createProduct } = useContext(storeContext);

  const history = useHistory();

  const initialValues = {
    title: '',
    price: '',
    description: '',
    images: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Обязательное поле!'),
    price: Yup.number()
      .typeError('Введите число!')
      .required('Обязательное поле!'),
    description: Yup.string().required('Обязательное поле!'),
    images: Yup.string().required('Обязательное поле!'),
  });

  const onSubmit = (values, actions) => {
    createProduct({
      ...values,
      images: [values.images],
    }).then((id) => {
      actions.resetForm();
      notifySuccess('Продукт был создан!');
      history.push(`/products/${id}`);
    });
  };

  return (
    <MainLayout>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className={classes.form}>
              <Typography variant="h4">Создание продукта</Typography>
              <label>Название</label>
              <Field
                className={classes.input}
                name="title"
                variant="outlined"
                as={TextField}
              />

              <ErrorMessage component={TextError} name="title" />

              <label>Цена</label>
              <Field
                className={classes.input}
                name="price"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="price" />

              <label>Описание</label>
              <Field
                variant="outlined"
                className={classes.input}
                rows={8}
                multiline
                name="description"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="description" />

              <label>Изображение</label>
              <Field
                className={classes.input}
                name="images"
                variant="outlined"
                as={TextField}
              />
              <ErrorMessage component={TextError} name="images" />

              <Button type="submit" color="primary" variant="contained">
                Создать
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
