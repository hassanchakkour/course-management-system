import * as React from "react";
import ReactDOM from "react-dom";
import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
} from "@dropzone-ui/react";

function App() {
  const [files, setFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
    console.log(incommingFiles[0].name);
  };

  // console.log(files[0].name);
  return (
    <>
      <Dropzone
        onChange={updateFiles}
        // header={false}
        footer={false}
        style={{
          backgroundColor: "transparent",
          width: "300px",
          color: "white",
          fontSize: "20px",
        }}
        maxFiles={1}
        accept=".pdf,.image,.jpeg,.mp4,.png/*"
        maxFileSize={2998000}
        value={files}
        label="Drag'n drop file here or click to browse"
      >
        {files.map((file) => (
          <FileMosaic {...file} preview info onSee={handleSee} hd />
        ))}
      </Dropzone>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
    </>
  );
}

export default App;
