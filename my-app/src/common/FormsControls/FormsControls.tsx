import React from "react";
import s from "./FormsControls.module.css";
import {requireField, FieldValidatorType} from "../../utils/validators/validators";
import {Field, WrappedFieldProps} from "redux-form";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";

type FormControlPropsType = {
	meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={s.formsControls + " " + (hasError ? s.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}



export function createField<FormKeysType extends string>(component: React.FC<WrappedFieldProps>,
							name: FormKeysType,
							validators: Array<FieldValidatorType>,
							placeholder: string | undefined,
							props = {},
							text = "") {
	return (
		<div>
			<Field placeholder={undefined} name={name}
				   validate={validators}
				   component={component}
				   {...props}
			/> {text}
		</div>
	)	
}
