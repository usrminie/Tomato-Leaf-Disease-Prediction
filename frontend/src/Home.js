import { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Clear from "@material-ui/icons/Clear";
import cblogo from "./logo.jpg";
import image from "./bg.png";
import axios from "axios";

// Custom Styles
const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#236135",
    boxShadow: "none",
    color: "white",
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: 400,
    background: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0px 12px 60px rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    overflow: "hidden",
  },
  cardEmpty: {
    padding: "20px",
    textAlign: "center",
  },
  media: {
    height: 300,
  },
  table: {
    marginTop: theme.spacing(2),
  },
  tableCell: {
    fontSize: "18px",
    fontWeight: 600,
  },
  loader: {
    margin: theme.spacing(2),
  },
  clearButton: {
    marginTop: theme.spacing(2),
    width: "100%",
    fontSize: "18px",
    fontWeight: 700,
  },
  dropzoneText: {
    color: "black", // Change this to your desired text color
  },
}));

// Main Component
const Home = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  // File Upload Functionality
  const sendFile = useCallback(async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios.post("https://api-production-0a11.up.railway.app/predict", formData);
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }, [image, selectedFile]);

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // Clean up URL object
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    setIsloading(true);
    sendFile();
  }, [preview, sendFile]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Tomato Disease Classification
          </Typography>
          <div className={classes.grow} />
          <Avatar src={cblogo}></Avatar>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <Card className={`${classes.card} ${!image ? classes.cardEmpty : ""}`}>
          {image ? (
            <CardActionArea>
              <CardMedia className={classes.media} image={preview} />
            </CardActionArea>
          ) : (
            <CardContent className={classes.cardEmpty}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Drag and drop a tomato leaf image"}
                onChange={onSelectFile}
                showAlerts={false}
                maxFileSize={5000000}
                filesLimit={1}
                dropzoneClass={classes.dropzoneText} // Apply the custom class here
              />
            </CardContent>
          )}

          {data && (
            <CardContent>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableRow>
                    <TableCell className={classes.tableCell}>Label</TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      Confidence
                    </TableCell>
                  </TableRow>
                  <TableBody>
                    <TableRow>
                      <TableCell>{data.class}</TableCell>
                      <TableCell align="right">{confidence}%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}

          {isLoading && (
            <CardContent className={classes.loader}>
              <CircularProgress className={classes.loader} />
              <Typography variant="h6">Processing</Typography>
            </CardContent>
          )}
        </Card>

        {data && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.clearButton}
            onClick={clearData}
            startIcon={<Clear />}
          >
            Clear
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;
