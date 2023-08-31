import { useState, useRef, ChangeEvent } from "react";
import "./FileUploader.scss";
import Button from "../Button/Button";
import { validMimeTypes } from "../../constants";

const fileTypes = ["JPG", "PNG", "GIF"];

type FileUploaderComponentProps = {
    title: string;
    onClose: () => void;
    handleFileUpload: (formData: FormData) => void;
}

export default function FileUploaderComponent({title, onClose, handleFileUpload}: FileUploaderComponentProps) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState(false);

    // handle drag events
    const handleDrag = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    // triggers when file is dropped
    const handleDrop = function (e: any) {
        console.log("drop");
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (fileError) {
            setFileError(false);
        }

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            if (!validMimeTypes.includes(file.type)) {
                setFileError(true);
                return;
            }
            setFile(file);
        }
    };

    // triggers when file is selected with click
    // const handleChange = function (e: any) {
    //     e.preventDefault();
    //     console.log('handle change');
    //     if (e.target.files && e.target.files[0]) {
    //         handleFiles(e.target.files);
    //     }
    // };

    const uploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (fileError) {
            setFileError(false);
        }
        if (event.target.files) {
            const file = event.target.files[0];

            if (!validMimeTypes.includes(file.type)) {
                setFileError(true);
                return;
            }
            setFile(file);
        }
    };

    const uploadFile = () => {
        // upload file
        console.log("send this file:", file);
        const formData = new FormData();
        if (file) {
            formData.append("file", file);
            console.log(formData);
        }

        // console.log(formData);

        handleFileUpload(formData);
        setFile(null);
    };

    // function handleFiles(files: any) {
    //     console.log(files);
    // }
    return (
        <div className="modal">
            <div className="modal__inner">
                <div className="modal__title">
                    {title}
                </div>
                <button className="cross large" onClick={onClose}>
                    <img src="./close.svg" alt="close" />
                </button>
                <form
                    id="form-file-upload"
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        id="input-file-upload"
                        multiple={true}
                        // onChange={handleChange}
                    />
                    <label
                        id="label-file-upload"
                        htmlFor="input-file-upload"
                        className={dragActive ? "drag-active" : ""}
                    >
                        <div className="file-upload-area">
                            <img src="./file-upload.svg" alt="upload" />
                            <div className="file-upload-area__action">
                                <label className="upload-button">
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={uploadHandler}
                                    />
                                    Upload a file
                                </label>
                                <p>or drag and drop</p>
                            </div>

                            <p className="file-upload-area__info">
                                Supported files: {fileTypes.join(",")}
                            </p>
                        </div>
                    </label>
                    {dragActive && (
                        <div
                            id="drag-file-element"
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        ></div>
                    )}
                </form>

                {
                        fileError &&
                        <div className="error">File not supported</div>
                    }

                {file && (
                    <div className="files">
                        <div className="file">
                            <div className="file__icon">
                                <img src="./film.svg" alt="file" />
                            </div>

                            <div className="file__info">
                                <div className="file__name">{file.name}</div>
                                <div className="file__size">{file?.size / 1000} KB</div>
                            </div>

                            <button className="cross"  onClick={() => {setFile(null)}}>
                                <img src="./close.svg" alt="close" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="actions">
                    <Button text={"Cancel"} color="light" onClick={() => {setFile(null)}} />
                    <Button text={"Upload"} onClick={uploadFile} />
                </div>
            </div>
        </div>
    );
}
