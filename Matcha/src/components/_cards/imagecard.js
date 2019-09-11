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
import { doMongoDBGetGalleryWithAuth, doUpdateGallery } from "../axios";
import Webcam from "react-webcam";

const useStyles = makeStyles(theme => ({
  card: {
	  
    maxWidth: 450
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

// export function SwipeCard({item, stuff, updatePhoto, removeImg}) {

//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   function handleExpandClick() {
//     setExpanded(!expanded);
//   }

//   return (
//     <Card className={classes.card}>
//       <CardHeader
//         title={item === "empty" ? "add image" : item}
//       />
//       <CardMedia
//         className={classes.media}
//         image={item === "empty" ? null : item}
//         title="Paella dish"
//       />
// 	  <CardContent >
// 	{expanded ? <MyCamera updatePhoto={updatePhoto}/> : null}
// 	  </CardContent>
//       <CardActions disableSpacing>
// 	  {item !== "empty" ?
// 	(<IconButton aria-label="remove image" onClick={() => removeImg(item)}>
// 		<ClearIcon />
// 	</IconButton>)
// 	  :
// 	(<IconButton aria-label="add image"
// 		onClick={handleExpandClick}
// 	>
// 		<AddIcon />
// 	</IconButton>)
// 	}
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
			replaced: null,
			}
	}

	reset = () => {
		if (this.state.replaced){
			this.setState({replaced: null});
		}
	}

	imageSaveReset = () => {
		let i = -1;
		let list = {};
		const {stuff} = this.state;

		while (++i < 4){
			if(stuff[i] === "empty"){
				break;
			}else{
				list[i] = stuff[i];
			}
			if(i > 4) break;
		}
		doUpdateGallery(this.props.authUser, list).then((res) => {
			this.setState({loading: true, list});

		}).then(this.props.changeState).catch(
			err => { if (err) alert(err);}
		)
		
	}

	setRef = webcam => {
		this.webcam = webcam;
	  };
	

	capture = async () => {
		let picture = await this.webcam.getScreenshot();
		if (picture === null) {
			return;
		}

		this.updatePhoto(picture);
		await this.setState({replaced: picture});
	  };

	MyCamera = () => {
		const videoConstraints = {
			width: 320,
			heigh: 220,
			facingMode: "user"
		};
	  const { replaced } = this.state;
		return (
			<div className="MyCameraStart" style={{display: 'flex'}}>
					<div className="Smile" style={{width: 320, height: 220, display: 'flex', justifyContent: 'inherit'}}>
					{!replaced ? (
						<Webcam
						audio={false}
						height={220}
						ref={this.setRef}
						screenshotFormat="image/jpeg"
						width={320}
						videoConstraints={videoConstraints}
						/>
						) : (<img src={replaced} alt={replaced} style={{width: 320, height: 220, display: 'flex', justifyContent: 'inherit'}} ></img>)}
					</div>
					<div style={{margin: 'auto', alignContent: 'center'}}>
						{ replaced ? 
						(<div>
							<button onClick={this.reset}>reset Photo</button>
							<button onClick={this.imageSaveReset}>Save Photo</button>
							</div>) : 
						(<button onClick={this.capture}>Capture photo</button>)}
					</div>
				</div>
		)
	}


	SwipeCard = ({item, updatePhoto}) => {

		const classes = useStyles();
		const [expanded, setExpanded] = React.useState(false);
	  
		function handleExpandClick() {
		  setExpanded(!expanded);
		}
	  
		return (
		  <Card className={classes.card}>
			<CardHeader
			  title={item === "empty" ? "add image" : "remove Img?"}
			/>
			<CardMedia
			  className={classes.media}
			  image={item === "empty" ? null : item}
			  title="Paella dish"
			/>
			<CardContent >
		  {expanded ? <this.MyCamera updatePhoto={updatePhoto}/> : null}
			</CardContent>
			<CardActions disableSpacing>
			{item !== "empty" ?
		  		(<IconButton aria-label="remove image" onClick={() => this.removeImg(item)}>
			  		<ClearIcon />
		 		 </IconButton>) :
		  		(<IconButton aria-label="add image" onClick={handleExpandClick}>
					<AddIcon />
		 		</IconButton>)
		 	}
			</CardActions>
		  </Card>
		);
	}

	updatePhoto(img){
		const {stuff} = this.state;

		if (img){
			let i = -1;
			while (++i < 4)
			{
				if (stuff[i] === 'empty'){
					stuff[i] = img;
					break;
				}
				if (i > 4) break;
			}
		}
	}

	removeImg(img){
		const {stuff} = this.state;
		let newstuff = [];
		if (img){
			let i = -1;
			while (++i < 4){
				if (stuff[i] === img){
					newstuff[i] = "empty";
					alert("set img to empty");
				} else {
					newstuff[i] = stuff[i];
					alert("set to stuff");
				}
				if (i > 4)break;
			}
			i = -1;
			while (++i < 4){
				if (newstuff[i] === "empty" && i + 1 < 4 && newstuff[i + 1] !== "empty"){
					newstuff[i] = newstuff[i + 1];
					newstuff[i + 1] = "empty";
					i = -1;
				}
				if (i > 4)break;
			}
			i = -1;
			while(++i < 4){
				this.state.list[i] = newstuff[i];
			}
			this.setState({});
			console.log(`============================== TEST START ================================`)
			console.log(this.state.list);
			console.log(newstuff);
			doUpdateGallery(this.props.authUser, this.state.list);
			console.log(`============================== TEST END ==================================`)
		}
	}

	componentDidMount() {
		this.setState({loading: true});

		const {profile, authUser} = this.props;

		doMongoDBGetGalleryWithAuth(authUser).then(
			async res => {
				console.log(await res)
				if (res.gallery) this.setState({list: await res.gallery});
				let things = [];
				let i = -1;
				while (++i < 4)
				{
					if (res.gallery[i] && res.gallery[i] !== "empty"){
						things.push(res.gallery[i]);
					} else {
						things.push("empty");
						break;
					}
					if (i > 4) break;
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
				<this.SwipeCard item={item}
				stuff={this.state.stuff}
				updatePhoto={this.updatePhoto} 
					removeImg={this.removeImg}
					/>) 
        );
    }
}