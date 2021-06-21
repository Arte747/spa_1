import React from 'react';
import s from './FormsControls.module.css'

export const Textarea = ({input, meta, ...props}) => {
	
	const hasError = meta.touched && meta.error;
	
	return (
		<div className={s.formsControls + ' ' + (hasError ? s.error : null)}>
			<div>
				<textarea {...input} {...props} />
			</div>
			{hasError ? <span>{meta.error}</span> : undefined}
		</div>
	);
};

export const Input = ({input, meta, ...props}) => {
	
	const hasError = meta.touched && meta.error;
	
	return (
		<div className={s.formsControls + ' ' + (hasError ? s.error : null)}>
			<div>
				<input {...input} {...props} />
			</div>
			{hasError ? <span>{meta.error}</span> : undefined}
		</div>
	);
};