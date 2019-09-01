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

export default function ReportUserCard(userId) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://image.shutterstock.com/image-photo/man-feeling-shy-hates-being-260nw-1270182640.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Are you sure you want to report user?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            You will no longer be able to send/recieve messages from this user and the moderation team will look into the issue. Thank you for reporting :)
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
            {/*add onclick for report/block to send api call to userid and report | block */}
          Yes, report this bitch
        </Button>
        <Button size="small" color="primary">
          Nah JK
        </Button>
      </CardActions>
    </Card>
  );
}
