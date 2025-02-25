"use client"

import { useState } from "react"
import MascotasTable from "./Tabla"
import MascotasForm from "./Form"
import styles from "./mascota.module.css"

function Mascotas() {
  const [currentView, setCurrentView] = useState("table")
  const [editId, setEditId] = useState(null)

  const handleNavigate = (view, id = null) => {
    setCurrentView(view)
    setEditId(id)
  }

  return (
    <div className={styles.container}>
      {currentView === "table" ? (
        <MascotasTable onNavigate={handleNavigate} />
      ) : (
        <MascotasForm id={editId} onNavigate={handleNavigate} />
      )}
    </div>
  )
}

export default Mascotas






