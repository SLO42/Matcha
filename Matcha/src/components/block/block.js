import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const BlockUserCard = ({location, history, firebase}) => {
  const classes = useStyles();

  if (!location.user){
	history.goBack();
}

	const blocknBounce = () => {
		firebase.doBlockUser(location.user);
		history.push(ROUTES.LANDING)
	}
	
	const bounce = () => {
		history.goBack();
	}

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/11/11/harold-0.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Are you sure you want to block {location.user ? location.user : "user"}?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            You will no longer be able to send/recieve messages from this user and anything associated with the user will not be visible to you.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={blocknBounce}>
          Yes, block this bitch
        </Button>
        <Button size="small" color="primary" onClick={bounce}>
          Nah lemme save the nudes first
        </Button>
      </CardActions>
    </Card>
  );
}

export default withFirebase(BlockUserCard);