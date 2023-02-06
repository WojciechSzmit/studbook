import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost, updatePost } from "../../redux/actions/postAction";
import Emoji from "./Emoji";
import {
  videoShow,
  pdfShow,
  imageShow,
} from "../../services/multimediaDisplay";

const PostInputModal = () => {
  const { auth, theme, form_status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  //stream z kamery
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    //console.log(files);
    //console.log(e.target.files);
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "Plik nie istnieje");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "Makszymalna wielkość pliku powinna wynosić 5mb");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  //Kasowanie zdjęć przy uploadzie
  const deleteImages = (index) => {
    //console.log(index);
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  //stream z kamery
  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  //stream z kamery - foto
  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);
    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };
  //------------------------------/////

  ////----posty-------////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Dodaj zdjęcie." },
      });

    if (form_status.onEdit) {
      dispatch(updatePost({ content, images, auth, form_status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.FORM_STATUS, payload: false });
  };

  //edytowanie postów
  useEffect(() => {
    if (form_status.onEdit) {
      setContent(form_status.content);
      setImages(form_status.images);
    }
  }, [form_status]);

  //-----O----/

  return (
    <div className="post_input_modal">
      <form onSubmit={handleSubmit}>
        <div className="form_status_header">
          <h5 className="m-0">Dodaj informację</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.FORM_STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="post_input_body">
          <textarea
            name="content"
            value={content}
            placeholder={`Nad czym pracujesz ${auth.user.username}?`}
            onChange={(e) => setContent(e.target.value)}
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
              color: theme ? "white" : "#111",
              background: theme ? "rgba(0,0,0,.03)" : "",
            }}
          />

          <div className="d-flex">
            <div className="flex-fill"></div>
            <Emoji setContent={setContent} content={content} theme={theme} />
          </div>

          <div className="display_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                {img.camera ? (
                  imageShow(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url, theme)
                      : img.url.match(/pdf/i)
                      ? pdfShow(img.url, theme)
                      : imageShow(img.url, theme)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img), theme)
                      : img.type.match(/pdf/i)
                      ? pdfShow(URL.createObjectURL(img), theme)
                      : imageShow(URL.createObjectURL(img), theme)}
                  </>
                )}
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {/* stream z kamery */}
          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          <div className="upload_images">
            {stream ? (
              <i className="fa-solid fa-camera-retro" onClick={handleCapture} />
            ) : (
              <>
                <div className="file_upload">
                  <i className="fa-regular fa-images" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*,.pdf"
                    onChange={handleChangeImages}
                  />
                </div>
                <i
                  className="fa-solid fa-camera-retro"
                  onClick={handleStream}
                />
              </>
            )}
          </div>
        </div>
        <div className="form_status_footer">
          <button className="btn btn-success w-40" type="submit">
            Opublikuj
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInputModal;
