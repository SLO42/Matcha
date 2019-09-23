import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCampground } from '@fortawesome/free-solid-svg-icons';
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
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { faCannabis } from '@fortawesome/free-solid-svg-icons';
import { faAnkh } from '@fortawesome/free-solid-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faSkiing } from '@fortawesome/free-solid-svg-icons';
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
  boot: {
	margin: 'auto',  
  },
  CardHeader: { 
	  padding: theme.spacing(1, 2),
  },
  list: {
	  width: 250,
	  height: '40vh',
	  backgroundColor: theme.palette.background.paper,
	  overflowY: 'auto',
	  overflowX: 'hidden',
  },
  button: {
	  margin: theme.spacing(0.5, 0),
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
	{name: "Hunting", value: faHippo},
	{name: "Reading", value: faBookOpen},
	{name: "Skiing", value: faSkiing},
];



const not = (a, b) => {
	return a.filter(value => b.indexOf(value) === -1);
}

const intersection = (a, b) => {
	return a.filter(value => b.indexOf(value) !== -1);
}

const union = (a, b) => {
	return [...a, ...not(b, a)];
}

const Chips = ({profile, checkStage}) => {
  const classes = useStyles();

  const TransferList = () => {
	const interestNames = [
		"Camping",
		"Coffee",
		"Beer",
		"Wine Tasting",
		"Gaming",
		"Karaoke",
		"Religion",
		"Shopping",
		"Star Gazing",
		"Running",
		"Handicap Access",
		"Travel", 
		"Theatre", 
		"Cooking", 
		"Biking", 
		"Fishing",
		"Smoking",
		"Concerts",
		"Hunting",
		"Reading",
		"Skiing",
	];
	const [checked, setChecked] = React.useState([]);
	

	const [left, setLeft] = 
		React.useState( profile ? profile.mystats.interest : []);

	const [right, setRight] =
		React.useState(not(interestNames, left));

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);
	
	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = items => intersection(checked, items).length;

	const handleToggleAll = items => () => {
		if (numberOfChecked(items) === items.length){
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		profile.mystats.interest = not(profile.mystats.interest, leftChecked);
		setChecked(not(checked, leftChecked));
		checkStage(6);
	};
	
	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		profile.mystats.interest = profile.mystats.interest.concat(rightChecked);
		setChecked(not(checked, rightChecked));
		checkStage(6);
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.CardHeader}
				avatar={
					<Checkbox
					onClick={handleToggleAll(items)}
					checked={numberOfChecked(items) === items.length && items.length !== 0}
					indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
					disabled={items.length === 0}
					inputProps={{ 'aria-label': 'All items selected' }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-all-item-${value}-label`;
					let icon = null;
					interestOptions.map(val => {
						if (val.name === value){
							icon = val.value;
						}
						return icon
					});
					
					return (
						<ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
							<Checkbox
							checked={checked.indexOf(value) !== -1}
							tabIndex={-1}
							disableRipple
							inputProps={{ 'aria-labelledby': labelId }}
							/>
							<Chip
								icon={<FontAwesomeIcon icon={icon} size="2x" />}
								label={value}
								clickable
								className={classes.chip}
								onClick={handleToggle(value)}
								color="primary"
							/>
						</ListItem>
					);
				})}
				<ListItem /> 
			</List>
		</Card>
	);

	return (
		<Grid container spacing={2} justify="center" alignItems="center" className={classes.boot}>
			<Grid item>{customList("Chosen", left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
						> &gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
						> &lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList('Choices', right)}</Grid>
		</Grid>
	);
}


  return (
    <div className={classes.root}>
		<TransferList />
    </div>
  );
}

export default Chips;