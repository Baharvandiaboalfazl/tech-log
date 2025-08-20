import { useState, useRef } from "react";

const ImageUploader = ({ onImageUploadSuccess, initialImage }) => {
  const [file, setFile] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(
    initialImage || null
  );
  const [inputMode, setInputMode] = useState("file");
  const fileInputRef = useRef(null);

  const clearImageStates = () => {
    setFile(null);
    setImageUrlInput("");
    setImageUploadError(null);
    setImageUploadProgress(0);
    setUploadedImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageUploadSuccess(null);
  };

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("لطفاً یک عکس برای آپلود انتخاب کنید.");
      return;
    }
    setImageUploadError(null);
    setImageUploadProgress(0);
    setUploadedImagePreview(null);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 1200,
            maxHeight = 800;
          let { width, height } = img;

          if (width > maxWidth || height > maxHeight) {
            if (width / maxWidth > height / maxHeight) {
              height *= maxWidth / width;
              width = maxWidth;
            } else {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setImageUploadProgress(progress);
            if (progress >= 100) {
              clearInterval(interval);
              setUploadedImagePreview(compressedBase64);
              onImageUploadSuccess(compressedBase64);
              setImageUploadError(null);
            }
          }, 100);
        };
        img.onerror = () => setImageUploadError("خطا در بارگذاری عکس.");
        img.src = e.target.result;
      };
      reader.onerror = (error) =>
        setImageUploadError("خطا در خواندن فایل: " + error.message);
      reader.readAsDataURL(file);
    } catch (error) {
      setImageUploadError("خطای ناشناخته: " + error.message);
    }
  };

  const handleUseUrl = () => {
    if (!imageUrlInput || !imageUrlInput.startsWith("http")) {
      setImageUploadError("لطفاً یک عکس معتبر وارد کنید.");
      return;
    }
    setImageUploadError(null);
    setUploadedImagePreview(imageUrlInput);
    onImageUploadSuccess(imageUrlInput);
  };

  const handleModeChange = (mode) => {
    clearImageStates();
    setInputMode(mode);
  };

  const getButtonClasses = (mode) => {
    const base =
      "w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-colors";
    if (inputMode === mode) {
      return `${base} bg-blue-600 text-white`;
    }
    return `${base} bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`;
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4 justify-center">
        <button
          type="button"
          onClick={() => handleModeChange("file")}
          className={getButtonClasses("file")}
        >
          آپلود فایل
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("url")}
          className={getButtonClasses("url")}
        >
          وارد کردن لینک
        </button>
      </div>

      {inputMode === "file" && (
        <div className="flex flex-col sm:flex-row gap-4 items-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            disabled
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImageUploadError(null);
              setUploadedImagePreview(null);
            }}
            className="flex-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="button"
            onClick={handleUploadImage}
            disabled={
              !file || (imageUploadProgress > 0 && imageUploadProgress < 100)
            }
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {imageUploadProgress > 0 && imageUploadProgress < 100
              ? `درحال آپلود... ${imageUploadProgress}%`
              : "آپلود عکس"}
          </button>
        </div>
      )}

      {inputMode === "url" && (
        <div className="flex flex-col sm:flex-row gap-4 items-center p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <input
            type="url"
            placeholder="لینک عکس را اینجا وارد کنید..."
            className="flex-1 w-full h-8 px-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={imageUrlInput}
            onChange={(e) => {
              setImageUrlInput(e.target.value);
              setImageUploadError(null);
              setUploadedImagePreview(null);
            }}
          />
          <button
            type="button"
            onClick={handleUseUrl}
            disabled={!imageUrlInput}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            استفاده از لینک
          </button>
        </div>
      )}

      {imageUploadError && (
        <div
          className="mt-5 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">خطا!</span> {imageUploadError}
        </div>
      )}

      {(uploadedImagePreview || initialImage) && (
        <div className="mt-5">
          <p className="text-sm font-medium mb-2 dark:text-gray-300">
            پیش‌نمایش عکس:
          </p>
          <img
            src={uploadedImagePreview || initialImage}
            alt="upload-preview"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
