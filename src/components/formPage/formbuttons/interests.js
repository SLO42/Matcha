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

  return (
    <div className={classes.root}>
      <Chip
        icon={<FontAwesomeIcon icon={faCampground} size="2x" />}
		label="Camping"
		clickable
		className={classes.chip}
		onClick={() => handleClick("Camping")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faCoffee} size="2x" />}
        label="Coffee"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Coffee")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faBeer} size="2x" />}
        label="Beer"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Beer")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faWineGlassAlt} size="2x" />}
        label="Wine Tasting"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Wine Tasting")}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faHeadset} size="2x" />}
        label="Gaming"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Gaming")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faMicrophone} size="2x" />}
        label="Karaoke"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Karaoke")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faAnkh} size="2x" />}
        label="Religion"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Religion")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faShoppingBag} size="2x" />}
        label="Shopping"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Shopping")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faStar} size="2x" />}
        label="Star Gazing"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Star Gazing")}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faRunning} size="2x" />}
        label="Running"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Running")}
        color="primary"
      />
<Chip
        icon={<FontAwesomeIcon icon={faWheelchair} size="2x" />}
        label="Handicap Access"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Handicap Access")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faPlaneDeparture} size="2x" />}
        label="Travel"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Travel")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faTheaterMasks} size="2x" />}
        label="Theatre"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Theatre")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faUtensils} size="2x" />}
        label="Cooking"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Cooking")}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faBicycle} size="2x" />}
        label="Biking"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Biking")}
        color="primary"
      />
<Chip
        icon={<FontAwesomeIcon icon={faFish} size="2x" />}
        label="Fishing"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Fishing")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faCannabis} size="2x" />}
        label="Smoking"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Smoking")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faMusic} size="2x" />}
        label="Concerts"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Concerts")}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faHippo} size="2x" />}
        label="Hunting"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Hunting")}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faBookOpen} size="2x" />}
        label="Reading"
        clickable
		className={classes.chip}
		onClick={() => handleClick("Reading")}
        color="primary"
      />

    
    </div>
  );
}

export default Chips;