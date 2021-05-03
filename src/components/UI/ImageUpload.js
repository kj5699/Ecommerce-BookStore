import React, { useState,useEffect,useRef} from 'react'
import { FormGroup, FormText, Input, Label } from 'reactstrap'
import './ImageUpload.scss';
import imageCompression from 'browser-image-compression';

const ImageUpload = props => {
    const [file,setFile]=useState(null)
    const [isValid,setIsValid]=useState(true)
    const [previewUrl,setPreviewUrl]=useState(null)
    const filePickerRef= useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader= new FileReader();
        fileReader.onload=()=>{
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    },
    
    [file])

    const pickedHandler = async(event) => {
        let pickedFile;
        let compressedFile;
        let fileIsValid=isValid;

        if(event.target.files && event.target.files.length ===1){
            pickedFile=event.target.files[0]
            console.log('originalFile instanceof Blob', pickedFile instanceof Blob); // true
            console.log(`originalFile size ${pickedFile.size / 1024 / 1024} MB`);

            try{
                compressedFile= await imageCompression(pickedFile, props.options)
                console.log('compressedFile instanceof Blob', compressedFile); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                setFile(compressedFile)
                setIsValid(true);
                fileIsValid=true;

            }catch(err){
                console.log(err);
            }
        }else{
            setIsValid(false);
            fileIsValid=false;
        }

        props.onInput(props.id,compressedFile,fileIsValid);
        
        

    }

    return (
        <>
        {!props.imagePath?<div className="image-upload__preview">
                    {previewUrl&&<img src={previewUrl} alt='Preview'></img>}
                    {!previewUrl&&<p>Please pick a image</p>}
        </div>:
        
        previewUrl ?
            <div className="image-upload__preview">
            {previewUrl&&<img src={previewUrl} alt='Preview'></img>}
        </div>:

        <div className="image-upload__preview">
            <img src={`http://localhost:5000/${props.imagePath}`} alt='Preview'></img>
        </div>
         
        }

        <FormGroup>
        <Label for={props.id}>{props.label}</Label>
        <Input  ref={filePickerRef} 
            type="file" 
            name={props.name}
            id={props.id} 
            accept ='.jpg,.png,.jpeg'
            onChange={pickedHandler}
            
            />
        <FormText color="muted">
          Add Image
        </FormText>
      </FormGroup>
      </>
    )
}



export default ImageUpload
