import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function BlockUserCard(userId) {
  const classes = useStyles();

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
            Are you sure you want to block user?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            You will no longer be able to send/recieve messages from this user and anything associated with the user will not be visible to you.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Yes, block this bitch
        </Button>
        <Button size="small" color="primary">
          Nah lemme save the nudes first
        </Button>
      </CardActions>
    </Card>
  );
}
