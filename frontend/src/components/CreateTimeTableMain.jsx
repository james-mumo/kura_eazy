import React, { useContext, useEffect, useState } from "react"
import { appContext } from "../context/appContext"

function CreateTimeTableMain() {
  const [showAddUnitModal, setShowAddUnitModal] = useState(false)
  const [showAddLecModal, setShowAddLecModal] = useState(false)
  const [singleUnit, setSingleUnit] = useState({})
  const [lecturer, setLecturer] = useState({ name: "", employeeID: "" })
  // const [classrooms, setClassrooms] = useState([])

  const {
    handleUnitsFileChange,
    initState,
    handleAddUnit,
    handleRoomsFileChange,
    handleLecturersFileChange,
    removeUnit,
    removeLecturer,
    lecturers,
    units,
    handleAddLec,
    rooms,
    ...state
  } = useContext(appContext)

  const handleUnitInput = (key, value) => {
    console.log(singleUnit)
    setSingleUnit({
      ...singleUnit,
      [key]: value,
    })
  }
  const handleLecInput = (key, value) => {
    console.log(lecturer)
    setLecturer({
      ...lecturer,
      [key]: value,
    })
  }

  const addLecturer = () => {
    setLecturers([
      ...lecturers,
      {
        name: "",
        employeeID: "",
        unitsTaught: [],
      },
    ])
  }

  const addClassroom = () => {
    setClassrooms([
      ...classrooms,
      {
        name: "",
        capacity: "",
      },
    ])
  }

  const removeClassroom = (index) => {
    const newClassrooms = [...classrooms]
    newClassrooms.splice(index, 1)
    setClassrooms(newClassrooms)
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-3 py-2 px-2">
        {/* Units */}
        <div className="bg-white p-4 border-blue-600 border rounded-md">
          <div className="flex justify-between align-middle items-center border p-1">
            <h2 className="text-xl font-bold text-indigo-500">Units</h2>

            <label
              htmlFor="fileInput"
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-sm text-white font-bold rounded-full cursor-pointer">
              <span style={{ verticalAlign: "middle" }}>
                Import Units from CSV
              </span>
              <input
                id="fileInput"
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleUnitsFileChange}
              />
            </label>
          </div>

          <div className="max-h-96 overflow-y-scroll overflow-x-hidden mt-3 border p-2">
            {state?.allUnits?.map((unit, index) => (
              <div
                className="mb-4 flex flex-col justify-center items-center border-b pb-3"
                key={index}>
                <div className="flex w-full px-3">
                  <label className="mr-1" htmlFor="item">
                    Unit Code :
                  </label>
                  <input
                    className=""
                    type="text"
                    placeholder="Unit Code"
                    value={unit.unitCode}
                    onChange={(e) => {
                      const newUnits = [...units]
                      newUnits[index].unitCode = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div className="flex w-full px-3">
                  <label className="mr-1" htmlFor="item">
                    Unit Title :
                  </label>
                  <input
                    type="text"
                    placeholder="Unit Name"
                    value={unit.unitName}
                    onChange={(e) => {
                      const newUnits = [...units]
                      newUnits[index].unitName = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div className="flex w-full px-3">
                  <label className="mr-1" htmlFor="item">
                    Students Taking Unit :
                  </label>
                  <input
                    type="text"
                    placeholder="Students"
                    value={unit.students}
                    onChange={(e) => {
                      const newUnits = [...units]
                      newUnits[index].students = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <button
                  className=" bg-indigo-500 mt-2 text-sm hover:bg-indigo-700 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-2"
                  onClick={() => removeUnit(unit.unitCode)}>
                  Remove Unit
                </button>
              </div>
            ))}
          </div>

          {/*  */}
          {showAddUnitModal && (
            <div className="mb-4 flex flex-col justify-center items-center border-b pb-3">
              <div className="flex w-full px-3">
                <label className="mr-1" htmlFor="item">
                  Unit Code :
                </label>
                <input
                  className=""
                  type="text"
                  placeholder="Unit Code"
                  value={singleUnit.unitCode}
                  onChange={(e) => handleUnitInput("unitCode", e.target.value)}
                />
              </div>
              <div className="flex w-full px-3">
                <label className="mr-1" htmlFor="item">
                  Unit Title :
                </label>
                <input
                  type="text"
                  placeholder="Unit Name"
                  value={singleUnit.unitName}
                  onChange={(e) => handleUnitInput("unitName", e.target.value)}
                />
              </div>
              <div className="flex w-full px-3">
                <label className="mr-1" htmlFor="item">
                  Students Taking Unit :
                </label>
                <input
                  type="text"
                  placeholder="Students"
                  value={singleUnit.students}
                  onChange={(e) => handleUnitInput("students", e.target.value)}
                />
              </div>
              <button
                className=" bg-indigo-500 mt-2 text-sm hover:bg-indigo-700 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-2"
                onClick={() => handleAddUnit(singleUnit)}>
                Submit Unit
              </button>
              <button
                className=" bg-red-700 mt-2 text-[11px] hover:bg-red-600 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-2"
                onClick={() => setShowAddUnitModal(!showAddUnitModal)}>
                Close Modal
              </button>
            </div>
          )}

          {!showAddUnitModal && (
            <div className="btns flex gap-5">
              <button
                className="mt-2 text-sm text-white font-bold rounded-sm cursor-pointer w-fit py-1 px-3 bg-red-700 hover:bg-red-600 transition"
                onClick={() => setShowAddUnitModal(!showAddUnitModal)}>
                Add Unit
              </button>
            </div>
          )}
        </div>

        {/* Lecturers */}
        <div className="bg-white p-4 border-blue-600 border rounded-md">
          <div className="flex justify-between align-middle items-center border p-1">
            <h2 className="text-xl font-bold text-indigo-500">Lecturers</h2>

            <label
              htmlFor="fileInputLecs"
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-sm text-white font-bold rounded-full cursor-pointer">
              <span style={{ verticalAlign: "middle" }}>
                Import Lecturers from CSV
              </span>
              <input
                id="fileInputLecs"
                type="file"
                className="hidden"
                onChange={handleLecturersFileChange}
              />
            </label>
          </div>

          <div className="max-h-96 overflow-y-scroll overflow-x-hidden mt-3 border p-2">
            {state?.allLecturers?.map((lecturer, index) => (
              <div
                className="mb-4 flex flex-col justify-center items-center border-b pb-3"
                key={index}>
                <div className="flex w-full px-3">
                  <label className="mr-1" htmlFor="item">
                    Lecturer Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Unit Code"
                    value={lecturer.name}
                    onChange={(e) => {
                      const newUnits = [...units]
                      newUnits[index].unitCode = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>
                <div className="flex w-full px-3">
                  <label className="mr-1" htmlFor="item">
                    Lecturer ID:
                  </label>
                  <input
                    type="text"
                    placeholder="Unit Code"
                    value={lecturer.employeeID}
                    onChange={(e) => {
                      const newUnits = [...units]
                      newUnits[index].unitCode = e.target.value
                      setUnits(newUnits)
                    }}
                  />
                </div>

                <div className="flex w-full px-3">
                  <label className="mr-2 font-semibold">
                    Units Taught Code:
                  </label>
                  <span>
                    {lecturer?.unitsTaught?.map((unit, index) => (
                      <span
                        className="px-2 text-sm py-1 bg-indigo-700 mr-1 text-white rounded-md"
                        key={index}>
                        {unit.unitCode}
                      </span>
                    ))}
                  </span>
                </div>

                <div className="flex w-full px-3">
                  <label className="mr-2 font-semibold">
                    Units Taught Titles:
                  </label>
                  <span>
                    {lecturer?.unitsTaughtTitles?.map((unit, index) => (
                      <span
                        className="text-indigo-800 font-semibold mr-3"
                        key={index}>
                        {unit.unitTitle}
                      </span>
                    ))}
                  </span>
                </div>

                <button
                  className=" bg-indigo-500 mt-2 text-sm hover:bg-indigo-700 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-3"
                  onClick={() => removeLecturer(lecturer.employeeID)}>
                  Remove Lecturer
                </button>
              </div>
            ))}
          </div>
          {showAddLecModal && (
            <div className="mb-4 flex flex-col justify-center items-center border-b pb-3">
              <div className="flex w-full px-3">
                <label className="mr-1" htmlFor="item">
                  Lecturer Name:
                </label>
                <input
                  type="text"
                  placeholder="Lecturer's Name"
                  value={lecturer.name}
                  onChange={(e) => handleLecInput("name", e.target.value)}
                />
              </div>
              <div className="flex w-full px-3">
                <label className="mr-1" htmlFor="item">
                  Lecturer ID:
                </label>
                <input
                  type="text"
                  placeholder="Unit Code"
                  value={lecturer.employeeID}
                  onChange={(e) => handleLecInput("employeeID", e.target.value)}
                />
              </div>

              <div className="flex w-full px-3">
                <label className="mr-2 font-semibold">Units Taught Code:</label>
                <span>
                  <input
                    type="text"
                    placeholder="Course Codes"
                    onChange={(e) =>
                      handleLecInput("unitsTaught", e.target.value)
                    }
                  />
                </span>
              </div>

              <div className="flex w-full px-3">
                <label className="mr-2 font-semibold">
                  Units Taught Titles:
                </label>
                <span>
                  <input
                    type="text"
                    placeholder="Course Titles"
                    onChange={(e) =>
                      handleLecInput("unitsTaughtTitles", e.target.value)
                    }
                  />
                </span>
              </div>

              <button
                className=" bg-indigo-500 mt-2 text-sm hover:bg-indigo-700 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-3"
                onClick={() => handleAddLec(lecturer)}>
                Submit Lecturer
              </button>
              <button
                className=" bg-red-700 mt-2 text-[11px] hover:bg-red-600 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-2"
                onClick={() => setShowAddLecModal(!showAddLecModal)}>
                Close Modal
              </button>
            </div>
          )}

          {!showAddLecModal && (
            <div className="btns flex gap-5">
              <button
                className="mt-2 text-sm text-white font-bold rounded-sm cursor-pointer w-fit py-1 px-3 bg-red-700 hover:bg-red-600 transition"
                onClick={() => setShowAddLecModal(!showAddLecModal)}>
                Add Lecturer
              </button>
            </div>
          )}
        </div>

        {/* Classrooms */}
        <div className="bg-white p-4 border-blue-600 border rounded-md">
          <div className="flex justify-between align-middle items-center border p-1">
            <h2 className="text-xl font-bold text-indigo-500">Rooms/Halls</h2>

            <label
              htmlFor="fileInputRooms"
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-full cursor-pointer">
              <span style={{ verticalAlign: "middle" }}>
                Import Rooms from CSV
              </span>
              <input
                id="fileInputRooms"
                type="file"
                className="hidden"
                onChange={handleRoomsFileChange}
              />
            </label>
          </div>

          <div className="max-h-96 overflow-y-scroll overflow-x-hidden mt-3 border p-2">
            {rooms.map((room, index) => (
              <div
                className="mb-4 w-full rounded border-b  px-2 py-2 flex flex-col"
                key={index}>
                <div className="flex w-full justify-evenly ">
                  <label htmlFor="tag">Room Name: </label>
                  <input
                    className="w-10 "
                    type="text"
                    placeholder="Room Name"
                    value={room.roomName}
                    onChange={(e) => {
                      const newClassrooms = [...classrooms]
                      newClassrooms[index].name = e.target.value
                      setClassrooms(newClassrooms)
                    }}
                  />

                  <label htmlFor="tag">Room Capacity: </label>
                  <input
                    className="w-10 "
                    type="text"
                    placeholder="Capacity"
                    value={room.roomCapacity}
                    onChange={(e) => {
                      const newClassrooms = [...classrooms]
                      newClassrooms[index].capacity = e.target.value
                      setClassrooms(newClassrooms)
                    }}
                  />
                </div>
                <div className="flex w-full justify-evenly">
                  <span>
                    <span>Type :</span> {room.roomType}
                  </span>
                  <span>
                    <span>Location :</span> {room.roomLocation}
                  </span>
                </div>
                <button
                  className="mx-auto bg-indigo-500 mt-2 text-sm hover:bg-indigo-700 text-white font-bold rounded-full cursor-pointer w-fit py-1 px-2"
                  onClick={() => removeUnit(index)}>
                  Remove Room/Hall
                </button>
              </div>
            ))}
          </div>
          <button onClick={addClassroom}>Add Classroom/Hall</button>
        </div>
      </div>

      <div className="infoView flex gap-3">
        <div className="bg-white p-4 border border-blue-500 ">
          <h2 className="text-lg font-bold mb-4">Units</h2>
          {state?.allUnits?.length}
        </div>

        <div className="bg-white p-4 border border-blue-500 ">
          <h2 className="text-lg font-bold mb-4">Lecturers</h2>
          {state?.allLecturers.length}
        </div>
        <div className="bg-white p-4 border border-blue-500 ">
          <h2 className="text-lg font-bold mb-4">Rooms</h2>
          {state?.allRooms.length}
        </div>
      </div>
    </div>
  )
}

export default CreateTimeTableMain
