import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


const Pagination = ({ currentPage = 1, setPageNumber, totalPages }) => {
    // Controlled component: `currentPage` is source of truth
    const buttons = computeButtons(currentPage, totalPages)

    function computeButtons(currentPage, total) {
        const maxButtons = 5
        const count = Math.min(maxButtons, Math.max(0, total))
        if (count === 0) return []

        let start = Math.max(1, Math.min(currentPage - Math.floor(count / 2), Math.max(1, total - count + 1)))
        return Array.from({ length: count }, (_, i) => start + i)
    }

    const goTo = (page) => {
        const clamped = Math.min(Math.max(1, page), Math.max(1, totalPages || 1))
        if (clamped !== currentPage) setPageNumber(clamped)
    }

    const canPrev = currentPage > 1
    const canNext = currentPage < Math.max(1, totalPages || 1)

    return (
        <div className="flex justify-center items-center mr-[50px] mt-4">
            <AiOutlineLeft
                onClick={canPrev ? () => goTo(currentPage - 1) : undefined}
                className={`bg-[rgb(105,105,128)] rounded-[5px] w-[25px] h-[25px] m-[5px] p-[5px]
                    ${canPrev ? 'opacity-100 text-white cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
            />

            {buttons.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() => goTo(pageNumber)}
                    className={`w-[25px] h-[25px] m-[5px] rounded-[5px] text-[15px] font-medium cursor-pointer 
                        ${currentPage === pageNumber ? 'bg-white text-black' : 'bg-[#5c5c5c] text-[#aaa]'}`}
                >
                    {pageNumber}
                </button>
            ))}

            <AiOutlineRight
                onClick={canNext ? () => goTo(currentPage + 1) : undefined}
                className={`bg-[rgb(105,105,128)] rounded-[5px] w-[25px] h-[25px] m-[5px] p-[5px]
                    ${canNext ? 'opacity-100 text-white cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
            />
        </div>
    )
}

export default Pagination