import React, {useState} from 'react';
import ImageUploading from 'react-images-uploading';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";



export function ImageUpload() {
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Box className="App" margin={'0'} paddingTop={'0'}>
        <h3 style={{color: 'black', marginTop:'0'}}>Upload Image</h3>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <Box paddingBottom='2rem'className="upload__image-wrapper">
            <Button
            size='small'
            sx={{m:'5px',fontSize:'8px', color:'black',backgroundColor:'#F6E89D'}}
            variant="contained" 
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Add Image
              </Button>
            &nbsp;
            <Button sx={{m:'5px',fontSize:'8px', fontWeight:'bold', color:'black',backgroundColor:'#F6E89D'}}size='small' variant="contained" onClick={onImageRemoveAll}>Remove all images</Button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button  sx={{ m:'5px', fontSize:'8px', fontWeight:'bold',color:'black', backgroundColor:'#F6E89D'}}variant='contained' size='small' onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button sx={{m:'5px',fontSize:'8px',fontWeight:'bold', color:'black',backgroundColor:'#F6E89D'}} variant='contained' size='small' onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </div>
            ))}
          </Box>
        )}
      </ImageUploading>
    </Box>
  );
}