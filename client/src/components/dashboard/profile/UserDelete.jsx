import Modal from "../../modals/Modal";

const UserDelete = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteUser,
}) => {
  return (
    <div className="w-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold dark:text-white">حذف حساب کاربری</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            این عمل غیرقابل بازگشت است.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="px-5 py-2 font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg cursor-pointer"
        >
          حذف حساب
        </button>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        title="حذف حساب کاربری"
      >
        <p>آیا از حذف حساب کاربری خود اطمینان دارید؟</p>
      </Modal>
    </div>
  );
};

export default UserDelete;
