import React from 'react';
import TextField from '@material-ui/core/TextField';


const TextFields = [
	// {name: "firstname", value: `firstname`},
	// {name: "lastname", value: `lastname`},
	{name: "bio", value: `bio`},
];


const CreateFields = ({handleChange, bio}) => {
	return TextFields.map(obj => (
		<div className={obj.name} >
			<TextField
				margin="normal"
				onChange={handleChange}
				fullWidth
				multiline
				value={bio}
				rowsMax={4}
				id={obj.name}
				label={"Tell us a little bit about youself"}
				name={obj.name}
			/>
		</div>
	))
	
}

const TextBio = ({profile, checkStage}) => {
	// const [firstname, setFirst] = React.useState("");
	// const [lastname, setLast] = React.useState("");
	const [bio, setBio] = React.useState(profile ? profile.mystats.bio : "");


	const handleChange = event => {
		// if (event.target.name === 'firstname'){
		// 	setFirst(event.target.value);
		// }
		// else if (event.target.name === 'lastname'){
		// 	setLast(event.target.value);
		// }
		if (event.target.name === 'bio'){
			setBio(event.target.value);
			profile.mystats.bio = event.target.value;
			checkStage(2)
		}
		// const save = async () => {
		// 	profile.firstname = await firstname;
		// 	profile.lastname = await lastname;  
		// 	profile.mystats.bio = await bio;  
		// }
		// save();
		// profile.firstname =  firstname;
		// profile.lastname =  lastname;  
		// profile.mystats.bio =  bio;  
		// profile.username = event.target.value;
		// profile.lastname = event.target.value;
		// profile.mystats.bio = event.target.value;
		
	}	




	return (
		<div className="TextFeilds">
			<CreateFields handleChange={handleChange} bio={bio}/>
		</div>
	)
}

export default TextBio;