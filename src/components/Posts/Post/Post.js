import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Paper
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost } from "../../../actions/posts";
import useStyles from "./style";
import "./style.css";

const user = JSON.parse(localStorage.getItem("profile"));

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>

    <Card className={classes.card} raised elevation={6}>
    <CardMedia
      className={classes.media}
      image={
        post.selectedFile ||
        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
      }
      title={post.title}
    />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="h6" color="black" component="h6">
          {post.tags.map((tag) => ` Date: ${tag} `)}
        </Typography>
      </div>

      <Typography
        className={classes.title}
        gutterBottom
        variant="h6"
        component="h6"
      >
        {`Exercise Type: ${post.title}`}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="black" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography variant="body2" color="black" component="p">
          {`Exercise Duration: ${post.duration}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "secondary" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <BorderColorIcon className={classes.btn} /> Edit Exercise
          </Button>
        )}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
    </>
  );
};

export default Post;
