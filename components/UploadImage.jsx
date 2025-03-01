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
          <button onClick={() => open()} className='p-2 bg-blue-500 text-white my-2 rounded-full'>Change Profile</button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
