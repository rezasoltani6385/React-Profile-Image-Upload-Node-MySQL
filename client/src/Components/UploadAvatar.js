import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Base_URL } from "./BaseURL";



function UploadAvatar(props) {
  const userId = props.userId
  const editorRef = useRef(null);
  const [scale, setScale] = useState(1)
  const [img, setImg] = useState(null)
  const [uploadStatus, setUploadStatus] = useState(false)


  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      document.getElementById('avatarEditor').style.display = 'flex'
      document.getElementById('controls').style.display = 'flex'
      document.getElementById('uploadBtn').style.display = 'flex'
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

            // send the image data to the server
            axios.post(`${Base_URL}/upload`, { imageData, userId })
            .then((response)=>{if (response.status === 200){
              setUploadStatus(true)
            }})
            .catch((error)=>{document.getElementById('error').innerHTML = error.message}) 
        
        }
    }
  };


  return (
    <div>
      {!uploadStatus ?
        <div>

          <p id='error' className="d-flex justify-content-center" style={{color: 'red', fontSize: '18px'}}></p>
          <div id="avatarEditor"  style={{display: 'none', justifyContent: 'center'}}>
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
          <br />
          <div id="controls" style={{display: 'none', justifyContent: 'center'}}>
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
          <div className="d-flex justify-content-center" >
            <input className="form-control" type='file' accept="image/*" onChange={handleFileChange} />
          </div>
          <br />
          <div id="uploadBtn" style={{display: 'none', justifyContent: 'center'}}>
            <button className="btn btn-success rounded" onClick={handleSave}>Upload</button>
          </div>
        </div>
        :
          <div className='text-center'>
              <h3>Upload successful!</h3>
              <br />
              <button className='btn btn-success rounded' onClick={() => props.setUploadModal(false)}>Close</button>
          </div>
      }
    </div>
  )
}

export default UploadAvatar