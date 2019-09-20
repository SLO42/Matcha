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
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { doMongoDBGetGalleryWithAuth, doUpdateGallery } from "../axios";
import MyCamera from '../camera';
import { Button } from "@material-ui/core";
import Axios from "axios";

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
			saved: false,
		}
	}

	removeNfix = (picture) => {
		const {list, stuff} = this.state;
		const result = stuff.filter(img => img !== picture);
		let i = 0;
		let gallery = {};
		while ( i < 5){
			if (result[i] && (result[i] === "empty" || result[i] === "nah")){
				break;
			} else {
				gallery[i] = result[i]
			}
			i++;
			if (i > 5) break;
		}
		doUpdateGallery(this.props.authUser, gallery);
		
	}

	addToStuff = (picture) => {
		if (this.state.stuff.length < 5){
			let i = 0;
			let gallery = {};
			let stuff = [];
			while (i < this.state.stuff.length){
				if (this.state.stuff[i] === "nah" || this.state.stuff[i] === "empty"){
					gallery[i] = picture;
					stuff[i] = picture;
				}
				else {
					gallery[i] = this.state.stuff[i];
					stuff[i] = this.state.stuff[i];
				}
				i++;
				if (i > 5) break;
			}
			this.setState({list: gallery, stuff});
			doUpdateGallery(this.props.authUser, gallery).then(
				rse => {
					this.setState({loading: true});
					setTimeout(this.setState({loading: false}), 3000);
				}
			)
		}
	}

	SwipeCard = ({item, addToStuff, removeNfix}) => {
		const classes = useStyles();
		const [expanded, setExpanded] = React.useState(false);
		const [saved, setSaved] = React.useState(false);
		const [sett, setSett] = React.useState(false);
		const [img, setImg] = React.useState(item);
	  
		function handleExpandClick() {
		  setExpanded(!expanded);
		}
		function handleSaveClick() {
		  setSaved(!saved);
		}
		function handleSettClick() {
		  setSett(!sett);
		  handleSaveClick();
		  addToStuff(img);
		//   const gallery = {}
		}

		const updatePhoto = (picture) => {
			setImg(picture);
			handleSaveClick();

		}

		const remove = () => {
			removeNfix(item);
		}
	  
		return (
		  <Card className={classes.card}>
			<CardHeader
			/>
			{item === "nah" || item === "empty" ? 
				expanded ? (
				<div>
				<MyCamera
					updatePhoto={updatePhoto}
					saved={sett}
				/>
				{ !saved ? null : <ButtonBase component={Button} variant="contained" onClick={handleSettClick}>Save</ButtonBase>}
				</div>
				) : null : (
			<CardMedia
			  className={classes.media}
			  image={item === "nah" || item === "empty" ? null : item}
			  title="item"
			/>)
		}
			
			{/* <img src={item === "nah" || item === "empty" ? null : item}/> */}
			<CardActions disableSpacing>
			  {item === "nah" || item === "empty" ? 
			  <IconButton aria-label="Modify"  onClick={handleExpandClick}>
			 	 <AddIcon/> 
			  </IconButton>
			  : 
			  <IconButton aria-label="Modify" onClick={remove}>
			 	 <ClearIcon />
			  </IconButton>}
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
			this.state.stuff.map((item, index) => 
				<this.SwipeCard item={item} key={index} addToStuff={this.addToStuff} removeNfix={this.removeNfix}/>) 
        );
    }
}