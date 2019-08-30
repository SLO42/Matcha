import React from 'react';

import { DatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

//will change to birthday and ask for age via DOB.

const MyAge = ({profile, checkStage}) => {

	const [selectedDate, setSelectedDate] = React.useState(new Date("2000-8-8"));
	let max = new Date();
	max.setFullYear( max.getFullYear() - 18 );


	function handleDateChange(date) {
		setSelectedDate(date);
		let now = new Date();
		const agedate = now.getFullYear() - date.getFullYear();
		profile.mystats.myage = agedate;
		checkStage(1);
	  }

  return (
		<Grid container justify="space-around">
			<DatePicker
				margin="normal"
				id="date-picker-dialog"
				label="Your Birthday"
				format="yyyy/MM/dd"
				value={selectedDate}
				onChange={handleDateChange}
				disableFuture={true}
				maxDate={max}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
      	</Grid>
  );
};

export default MyAge;