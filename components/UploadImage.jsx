import { CldUploadWidget } from 'next-cloudinary';

const UploadImage = ({ setImageUrl }) => {
  const handleSuccess = (result) => {
    console.log(result);
    const uploadedUrl = result.info.secure_url;
    setImageUrl(uploadedUrl); // Pass the URL to the parent component
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="unsign"
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button onClick={() => open()}>Change Profile</button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
