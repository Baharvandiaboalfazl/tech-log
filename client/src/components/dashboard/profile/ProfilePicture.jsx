import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ImageUploader from "../../modals/ImageUploader";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const uploaderVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

const ProfilePicture = ({ currentUser, imgUploader }) => {
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <motion.div
      ref={menuRef}
      layout
      onClick={() => !isOpen && setIsOpen(true)}
      className="absolute cursor-pointer bg-white dark:bg-slate-800 shadow-2xl overflow-hidden"
      style={{
        width: isOpen ? 384 : 150,
        height: isOpen ? 256 : 150,
        borderRadius: isOpen ? 32 : 9999,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="uploader"
            variants={uploaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center w-full h-full"
          >
            <ImageUploader onImageUploadSuccess={imgUploader} />
          </motion.div>
        ) : (
          <motion.div
            key="avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 0.2 },
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full h-full"
          >
            <img
              src={currentUser?.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfilePicture;
