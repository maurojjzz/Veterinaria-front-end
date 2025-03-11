"use client"

import { useState } from "react"
import EspecieTable from "./Tabla"
import EspecieForm from "./Form"
import styles from "./especie.module.css"

function Especie() {
  const [currentView, setCurrentView] = useState("table")
  const [editId, setEditId] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleNavigate = (view, id = null) => {
    setCurrentView(view)
    setEditId(id)
  }

  const handleSuccess = () => {
    setCurrentView("table")
    setEditId(null)
    setRefreshKey((prev) => prev + 1) 
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      </div>
      {currentView === "table" ? (
        <EspecieTable onNavigate={handleNavigate} refreshKey={refreshKey} />
      ) : (
        <EspecieForm id={editId} onSuccess={handleSuccess} onCancel={() => handleNavigate("table")} />
      )}
    </div>
  )
}

export default Especie

