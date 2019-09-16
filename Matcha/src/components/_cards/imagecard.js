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
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
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

// export function SwipeCard({item}) {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   function handleExpandClick() {
//     setExpanded(!expanded);
//   }

//   const addPhoto = {}

//   return (
//     <Card className={classes.card}>
//       <CardHeader
//         title={item}
//       />
//       <CardMedia
//         className={classes.media}
//         image={item === "nah" || item === "empty" ? null : item}
//         title="item"
//       />
	  
// 	  <img src={item === "nah" || item === "empty" ? null : item}/>
//       <CardActions disableSpacing>
//         <IconButton aria-label="Modify">
// 		{item === "nah" || item === "empty" ? 
// 		<AddIcon onClick={() => {window.alert("hey")}}/> 
// 		: 
// 		<ClearIcon onClick={() => {window.alert("hey")}}/>}
//         </IconButton>
//       </CardActions>
//     </Card>
//   );
// }


export default class ImageCard extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			list: {},
			stuff: [],
		}
	}

	SwipeCard({item}) {
		const classes = useStyles();
		const [expanded, setExpanded] = React.useState(false);
	  
		function handleExpandClick() {
		  setExpanded(!expanded);
		}
	  
		const addPhoto = {}
	  
		return (
		  <Card className={classes.card}>
			<CardHeader
			  title={item}
			/>
			<CardMedia
			  className={classes.media}
			  image={item === "nah" || item === "empty" ? null : item}
			  title="item"
			/>
			
			<img src={item === "nah" || item === "empty" ? null : item}/>
			<CardActions disableSpacing>
			  <IconButton aria-label="Modify">
			  {item === "nah" || item === "empty" ? 
			  <AddIcon onClick={() => {window.alert("hey")}}/> 
			  : 
			  <ClearIcon onClick={() => {window.alert("hey")}}/>}
			  </IconButton>
			</CardActions>
		  </Card>
		);
	  }

	componentDidMount() {
		this.setState({loading: true});

		const {profile, authUser} = this.props;

		doMongoDBGetGalleryWithAuth(authUser).then(
			async res => {
				this.setState({list: await res.gallery});
				let things = [];
				let i = -1;
				while (++i < 5)
				{
					if (res.gallery[i] && (res.gallery[i] !== "nah") && (res.gallery[i] !== "empty")){
						console.log(res.gallery[i])
						things.push(res.gallery[i]);
					} else {
						if (i >= 1 && (!res.gallery[i - 1] || res.gallery[i - 1] === "nah" || res.gallery[i - 1] === "empty")){
							things.push("empty");
							break;
						}
						if (!res.gallery[i] || res.gallery[i] === "nah" || res.gallery[i] === "empty"){
							things.push("empty");
							break;
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
				<this.SwipeCard item={item} />) 
        );
    }
}