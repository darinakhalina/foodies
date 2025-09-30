import { useState } from 'react';
import css from './UploadPhoto.module.css';

const UploadPhoto = ({ setFieldValue }) => {
  const [preview, setPreview] = useState(null);
  return (
    <div className={css.box}>
      {preview ? (
        <img src={preview} alt="Recipe preview" className="object-cover w-full h-full rounded-xl" />
      ) : (
        <label className="cursor-pointer text-gray-500">
          <input
            type="file"
            className="hidden"
            onChange={e => {
              const file = e.target.files[0];
              setFieldValue('photo', file);
              setPreview(URL.createObjectURL(file));
            }}
          />
          Upload a photo
        </label>
      )}
    </div>
  );
};

export default UploadPhoto;
