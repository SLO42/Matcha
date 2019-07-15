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

export default function Chips() {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  function handleClick() {
    alert('You clicked the Chip.');
  }

  return (
    <div className={classes.root}>
      <Chip
        icon={<FontAwesomeIcon icon={faCampground} size="2x" />}
        label="Camping"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faCoffee} size="2x" />}
        label="Coffee"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faBeer} size="2x" />}
        label="Beer"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faWineGlassAlt} size="2x" />}
        label="Wine Tasting"
        clickable
        className={classes.chip}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faHeadset} size="2x" />}
        label="Gaming"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faMicrophone} size="2x" />}
        label="Karaoke"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faAnkh} size="2x" />}
        label="Religion"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faShoppingBag} size="2x" />}
        label="Shopping"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faStar} size="2x" />}
        label="Star Gazing"
        clickable
        className={classes.chip}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faRunning} size="2x" />}
        label="Running"
        clickable
        className={classes.chip}
        color="primary"
      />
<Chip
        icon={<FontAwesomeIcon icon={faWheelchair} size="2x" />}
        label="Handicap Access"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faPlaneDeparture} size="2x" />}
        label="Travel"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faTheaterMasks} size="2x" />}
        label="Theatre"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faUtensils} size="2x" />}
        label="Cooking"
        clickable
        className={classes.chip}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faBicycle} size="2x" />}
        label="Biking"
        clickable
        className={classes.chip}
        color="primary"
      />
<Chip
        icon={<FontAwesomeIcon icon={faFish} size="2x" />}
        label="Fishing"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faCannabis} size="2x" />}
        label="Smoking"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faMusic} size="2x" />}
        label="Concerts"
        clickable
        className={classes.chip}
        color="primary"
      />
      <Chip
        icon={<FontAwesomeIcon icon={faHippo} size="2x" />}
        label="Hunting"
        clickable
        className={classes.chip}
        color="primary"
      />
       <Chip
        icon={<FontAwesomeIcon icon={faBookOpen} size="2x" />}
        label="Reading"
        clickable
        className={classes.chip}
        color="primary"
      />

    
    </div>
  );
}
