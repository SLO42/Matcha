import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faHippo } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faWineGlassAlt } from '@fortawesome/free-solid-svg-icons';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { faCannabis } from '@fortawesome/free-solid-svg-icons';
import { faAnkh } from '@fortawesome/free-solid-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faSkiing } from '@fortawesome/free-solid-svg-icons';
import { faPagelines } from '@fortawesome/free-solid-svg-icons';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
import { faWheelchair } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

// list of options/buttons 
const interestOptions = [
	{name: "Camping", value: faCampground},
	{name: "Coffee", value: faCoffee},
	{name: "Beer", value: faBeer},
	{name: "Wine Tasting", value: faWineGlassAlt},
	{name: "Gaming", value: faHeadset},

	{name: "Karaoke", value: faMicrophone},
	{name: "Religion", value: faAnkh},
	{name: "Shopping", value: faShoppingBag},
	{name: "Star Gazing", value: faStar},
	{name: "Running", value: faRunning},

	{name: "Handicap Access", value: faWheelchair},
	{name: "Travel", value: faPlaneDeparture},
	{name: "Theatre", value: faShoppingBag},
	{name: "Cooking", value: faUtensils},
	{name: "Biking", value: faBicycle},

	{name: "Fishing", value: faFish},
	{name: "Smoking", value: faCannabis},
	{name: "Concerts", value: faMusic},
	{name: "Hunting", value: faMusic},
	{name: "Reading", value: faBookOpen},
	{name: "Skiing", value: faSkiing},
];


const Chips = ({ userObj }) => {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  const arrayRemove = (arr, value) => {
	return arr.filter( ele => {
		return ele != value;
	});
  }

  function handleClick(anything) {
	if (userObj.interest.includes(anything)){
		userObj.interest = arrayRemove(userObj.interest, anything);
		alert("removed from interests: " + anything);
	} else {
		userObj.interest.push(anything);
		userObj.interest.sort((a, b) => {return a - b});
		alert("added to interestes: " + anything); 
	}
//    console.log(userObj.interest);
  }

  const ChipCreator = () => {
	return interestOptions.map((pair) => {
		return (
			<Chip
			icon={<FontAwesomeIcon icon={pair.value} size="2x" />}
			label={pair.name}
			clickable
			className={classes.chip}
			onClick={() => handleClick(`${pair.name}`)}
			color="primary"
		  />
		)
	})
}

  return (
    <div className={classes.root}>
		<ChipCreator />
    </div>
  );
}

export default Chips;