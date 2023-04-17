import React from "react"

const ExcellReader = () => {
  const [units, setUnits] = useState([])
  const [lecturers, setLecturers] = useState([])

  function handleUnitsFileChange(event) {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      const newUnits = rows.slice(1).map((row) => ({
        unitCode: row[0],
        unitName: row[1],
        students: row[2],
      }))

      setUnits([...units, ...newUnits])
    }

    reader.readAsArrayBuffer(file)
  }

  return <div>hhgh</div>
}

export default ExcellReader
