import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Base_URL } from "../Components/BaseURL";



function UploadAvatar() {
  const editorRef = useRef(null);
  const [scale, setScale] = useState(1)
  const [img, setImg] = useState(null)
  const userId = 8

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImg(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
        const canvasScaled = editorRef.current.getImageScaledToCanvas();
        const canvasCropped = editorRef.current.getImage().toDataURL(); // get the cropped canvas as data URL

        const img = new Image();
        img.src = canvasCropped;

        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = canvasScaled.width;
            canvas.height = canvasScaled.height;
            const ctx = canvas.getContext("2d");

            ctx.beginPath();
            ctx.arc(
                canvasScaled.width / 2,
                canvasScaled.height / 2,
                canvasScaled.width / 2,
                0,
                2 * Math.PI
            );
            ctx.closePath();
            ctx.clip();

            const scaleFactor = canvasScaled.width / img.width;
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                0,
                0,
                img.width * scaleFactor,
                img.height * scaleFactor
            );

            const imageData = canvas.toDataURL();

            
            axios.post(`${Base_URL}/upload`, { imageData, userId }) // send the image data to the server
        
        }
    }
  };


  return (
    <div>
        <div >
            <AvatarEditor
                ref={editorRef}
                image={img}
                width={300}
                height={300}
                border={10}
                borderRadius={180}
                color={[245, 245, 245, 1.5]} // RGBA
                scale={scale}
            />
        </div>
      <div className="d-flex">
        <button className="btn btn-primary rounded-pill" style={{marginLeft: '10px', marginRight: '10px'}} onClick={()=> 2 > scale > 0 && setScale(scale + 0.1)}>
            <FontAwesomeIcon icon={faSearchPlus} />
        </button>
        <button className="btn btn-primary rounded-pill" style={{marginLeft: '10px', marginRight: '10px',}} onClick={()=> scale > 0.6 && setScale(scale - 0.1)}> 
            <FontAwesomeIcon icon={faSearchMinus} />
        </button>
        <button className="btn btn-primary rounded-pill" style={{marginLeft: '10px', marginRight: '10px',}} onClick={()=> scale !== 1 && setScale(1)}> 
            <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </div>
      <br />
      <input type='file' accept="image/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default UploadAvatar;