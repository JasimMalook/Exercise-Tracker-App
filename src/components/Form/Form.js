import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./style";
import { createPost, updatePost } from "../../actions/posts";

const initState = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
  duration: "",
};
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initState);
  const user = JSON.parse(localStorage.getItem("profile"));
  const { title, message, tags, selectedFile, duration } = postData;
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      duration: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message || !tags || !selectedFile) {
      alert("provide valid input");
    } else {
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
        clear();
      } else {
        dispatch(
          updatePost(currentId, { ...postData, name: user?.result?.name })
        );
        clear();
      }
    }
  };
  if (!user?.result?.name) {
    return <Typography></Typography>;
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Post Exercise"}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Exercise"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          type="date"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split("/") })
          }
        />
        <TextField
          name="duration"
          variant="outlined"
          label="Exercise Duration"
          fullWidth
          value={postData.duration}
          onChange={(e) =>
            setPostData({ ...postData, duration: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
