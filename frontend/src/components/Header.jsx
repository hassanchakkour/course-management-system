import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";

const Header = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="text-white mt-24 ml-24">
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="p-24 border">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default Header;
