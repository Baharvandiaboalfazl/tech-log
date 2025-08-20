const PaginationButtons = ({
  handlePageChange,
  totalDataNumber,
  rowsIndex,
  startIndex,
}) => {
  return (
    <>
      {totalDataNumber > rowsIndex && (
        <div className="flex justify-center items-center gap-4 mt-6  dark:text-white text-sm">
          <button
            onClick={() =>
              handlePageChange(Math.max(0, startIndex - rowsIndex))
            }
            disabled={startIndex === 0}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            قبلی
          </button>

          <span>
            نمایش {startIndex + 1}–
            {Math.min(startIndex + rowsIndex, totalDataNumber)} از
            {totalDataNumber}
          </span>

          <button
            onClick={() => handlePageChange(startIndex + rowsIndex)}
            disabled={startIndex + rowsIndex >= totalDataNumber}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      )}
    </>
  );
};

export default PaginationButtons;
