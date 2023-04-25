import React from "react"

const AddElectionCard = ({
  cardName,
  cardHeaderSpan,
  headerSpanNumber,
  cardBodySpan,
  cardBodyNumber,
  cardBtnText,
  handleClick,
}) => {
  return (
    <div onClick={handleClick}>
      <div className="flex flex-col border bg-blue-700 text-white rounded-md p-2">
        <span className="w-full text-center font-bold text-lg">{cardName}</span>
        <div className="flex w-full ml-3 text-[15px] gap-3">
          <span>{cardHeaderSpan}</span> <span>{headerSpanNumber}</span>
        </div>
        <div className="flex  w-full ml-3 text-[15px] gap-3">
          <span>{cardBodySpan}</span> <span>{cardBodyNumber}</span>
        </div>
        <button className="mx-auto w-fit inline-flex items-center px-4 py-2 my-2 bg-teal-700 hover:bg-teal-900 text-sm text-white font-bold rounded-full cursor-pointer">
          {cardBtnText}
        </button>
      </div>
    </div>
  )
}

export default AddElectionCard
