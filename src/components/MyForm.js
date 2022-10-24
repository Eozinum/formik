import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import MaskedInput from 'react-input-mask';

const initialValues = {
	name: '',
	email: '',
	phone: '',
};

const validationSchema = Yup.object({
	name: Yup.string()
		.required('Enter your name')
		.min(2, 'Name should contain at least 2 symbols')
		.max(30, 'Name cannot contain more than 30 symbols'),
	email: Yup.string()
		.email('Invalid email format. Example: user@gmail.com')
		.required('Enter your email'),
	phone: Yup.string()
		.matches(/^[1]\d{10}|[0,2-9]\d{11}$/, 'Must be a valid phone number')
		.required('Enter your phone'),
});

const MyForm = () => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, { resetForm }) => {
				console.log(values);
				alert(`Your data is saved! 👌
Name: ${values.name} 
Email: ${values.email} 
Phone: ${values.phone}`);
				resetForm({ values: '' });
			}}
			validateOnMount
		>
			{(props) => {
				const { values, isValid, handleChange, setFieldValue } = props;
				return (
					<Form>
						<div className='form-control'>
							<label htmlFor='name'>Name</label>
							<Field
								type='text'
								id='name'
								name='name'
								onChange={(e) => {
									if (/^[a-zA-Z]*$/.test(e.target.value)) {
										setFieldValue('name', e.target.value);
									}
								}}
							/>
							<ErrorMessage name='name' component={TextError} />
						</div>

						<div className='form-control'>
							<label htmlFor='email'>E-mail</label>
							<Field
								type='email'
								id='email'
								name='email'
								onChange={handleChange}
							/>
							<ErrorMessage name='email' component={TextError} />
						</div>

						<div className='form-control'>
							<label htmlFor='phone'>Phone</label>
							<Field
								as={MaskedInput}
								mask='+38 (099) 999 9999'
								alwaysShowMask={true}
								type='phone'
								id='phone'
								name='phone'
								value={values.phone}
								onChange={(e) => {
									setFieldValue(
										'phone',
										e.target.value.replace(/[^0-9]+/g, ''),
									);
								}}
							/>
							<ErrorMessage name='phone' component={TextError} />
						</div>

						<button type='submit' disabled={!isValid}>
							Next
						</button>
					</Form>
				);
			}}
		</Formik>
	);
};

export default MyForm;
