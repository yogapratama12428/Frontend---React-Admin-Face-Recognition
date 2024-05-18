import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [file2, setFile2] = useState('');
  const [file3, setFile3] = useState('');
  const [preview, setPreview] = useState('');
  const [preview2, setPreview2] = useState('');
  const [preview3, setPreview3] = useState('');
  const navigate = useNavigate();
  const [progress, setProgress] = useState();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const loadImage2 = (e) => {
    const image2 = e.target.files[0];
    setFile2(image2);
    setPreview2(URL.createObjectURL(image2));
  };

  const loadImage3 = (e) => {
    const image3 = e.target.files[0];
    setFile3(image3);
    setPreview3(URL.createObjectURL(image3));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('File1', file);
    formData.append('File2', file2);
    formData.append('File3', file3);
    formData.append('label', title);
    try {
      const respon = await axios
        .post('http://localhost:5000/api/create', formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
          onUploadProgress: (progress) => {
            setProgress(Math.round((100 * progress.loaded) / progress.total));
          },
        })
        .finally(navigate('/'), () => {
          console.log('berhasil di input');
        });

      console.log(respon.data);
      // navigate('/');
    } catch (error) {
      console.log(error.respon.data);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Nama Karyawan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image 1</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Image 2</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage2}
                    disabled={false}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Image 3</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage3}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              foto 1
              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview" />
                </figure>
              ) : (
                ''
              )}
            </div>
            <div className="column">
              foto 2
              {preview2 ? (
                <figure className="image is-128x128 ">
                  <img src={preview2} alt="Preview" />
                </figure>
              ) : (
                ''
              )}
            </div>
            <div className="column">
              foto 3
              {preview3 ? (
                <figure className="image is-128x128">
                  <img src={preview3} alt="Preview" />
                </figure>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="field py-auto pt-5">
            <div className="control">
              <button
                type="submit"
                className="button is-success"
                disabled={!file || !file2 || !file3 || !title}
              >
                Save
              </button>
            </div>
          </div>
          {progress && <ProgressBar now={progress} label={`${progress}%`} />}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
