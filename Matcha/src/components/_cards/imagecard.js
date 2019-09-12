import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Feedback from "@material-ui/icons/Feedback";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { doMongoDBGetGalleryWithAuth } from "../axios";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Feedback />
          </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Report User</MenuItem>
        <MenuItem onClick={handleClose}>Block User</MenuItem>
      </Menu>
    </div>
  );
}

export function SwipeCard({item}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={item}
      />
      <CardMedia
        className={classes.media}
        image={item === "empty" ? null : item}
        title="Paella dish"
      />
	  <img src={item}/>
      <CardActions disableSpacing>
        <IconButton aria-label="remove image">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}


export default class ImageCard extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			list: {},
			stuff: [],
		}
	}

	componentDidMount() {
		this.setState({loading: true});

		const {profile, authUser} = this.props;

		doMongoDBGetGalleryWithAuth(authUser).then(
			async res => {
				console.log(await res)
				this.setState({list: await res.gallery});
				let things = [];
				let i = -1;
				while (++i < 5)
				{
					console.log(!!res.gallery[i] && res.gallery[i] !== "nah");
					if (!!res.gallery[i] && res.gallery[i] !== "nah"){

						// const xhr = new XMLHttpRequest;
						// xhr.responseType = 'blob';

						// xhr.onload = function() {
						// 	const recoveredBlob = xhr.response;

						// 	const reader = new FileReader;

						// 	reader.onload = function() {
						// 		const blobAsDataUrl = reader.result;
						// 		window.location = blobAsDataUrl;
						// 	};

						// 	reader.readAsDataURL(recoveredBlob);
						// };

						// xhr.open('GET', res.gallery[i]);
						// xhr.send();
						console.log("1")
						const blob = new Blob();
						blob.getBlob(await res.gallery[i]);
						blob.text().then(text => {
							console.log(text);
						})

						console.log(await blob)


						const stream = blob.stream();


						console.log(stream)

						let img = await ( new Response(res.gallery[i])).text();
						console.log(await img);
						things.push(await img);
					} else {
						if (!!res.gallery[i] && res.gallery[i] === "nah"){
							things.push("empty");
						} else if (!!res.gallery[i - 1]){
							things.push("empty");
						}
					}
					if (i > 5){
						break; 
					}
				}
				this.setState({stuff: things, loading: false});
			}).catch(
				err => {
					if (err){
						this.setState({list: null, loading: false});
						return (err);
					} 
			});
		
	}


    render() {
        return( this.state.loading ? <p>loading...</p> : 
			this.state.stuff.map(item => 
				<SwipeCard item={item} />) 
        );
    }
}