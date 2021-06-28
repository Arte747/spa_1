// export const requireField = (value) => {
	// if(value) return undefined;
	// return 'Field is required';
// };

// export const maxLengthCreator = (maxLength) => (value) => {
	// if(value.length > maxLength) return `Max length is ${maxLength}sumbols`;
	// return undefined;
// };

export const requireField = value => {
    if (value) return undefined;

    return "Field is required";
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}