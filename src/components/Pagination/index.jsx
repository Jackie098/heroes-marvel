function ButtonsPagination({ totalPages, currentPage, handlePageClick }) {
  const PAGES_PER_INTERVAL = 5;

  const buttons = [];

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > PAGES_PER_INTERVAL) {
    const halfInterval = Math.floor(PAGES_PER_INTERVAL / 2);
    startPage = Math.max(currentPage - halfInterval, 1);
    endPage = startPage + PAGES_PER_INTERVAL - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - PAGES_PER_INTERVAL + 1, 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <button
        key={`pagination-btn-${i}`}
        className="bg-red-500 p-1 disabled:bg-white disabled:text-slate-900"
        disabled={i === currentPage}
        onClick={() => handlePageClick(i)}
      >
        {i}
      </button>
    );
  }

  if (startPage > 1) {
    buttons.unshift(
      <button
        key={`pagination-btn-prev`}
        className="bg-red-800 p-2"
        onClick={() => handlePageClick(startPage - 1)}
      >
        &laquo;
      </button>
    );
  }

  if (endPage < totalPages) {
    buttons.push(
      <button
        key={"pagination-btn-next"}
        className="bg-red-800 p-2"
        onClick={() => handlePageClick(endPage + 1)}
      >
        &raquo;
      </button>
    );
  }

  return buttons;
}

export function Pagination({ totalPages, currentPage, handlePageClick }) {
  return (
    <div className="flex justify-center gap-1">
      <ButtonsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
