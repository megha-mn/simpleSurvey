import React from 'react';

let Button = (props) =>{
	const {name, onClick} = props;
	return(
	<button onClick={onClick} type="submit">{name}</button>
	)
}

export default Button;

