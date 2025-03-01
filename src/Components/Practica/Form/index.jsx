"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { Input, ButtonSubmit, Toast, ModalAlert } from "../../Shared"
import styles from "./form.module.css"
import { practicaSchema } from "../../../Validations"
import { joiResolver } from "@hookform/resolvers/joi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { addPract, updatePract } from "../../../redux/practicas/thunks.js"
import { Typography } from "@mui/material"

const FormPractica = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(null)

  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const dataForm = location.state?.params

  const { pending, error } = useSelector((state) => state.practicas)

  const practicaDataUpdate = {
    descripcion: dataForm?.descripcion,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(practicaSchema),
    defaultValues: {
      ...practicaDataUpdate,
    },
  })

  useEffect(() => {
    if (!pending && error) {
      setToastMessage(error)
      setToastType("Error")
      setShowToast(true)
    }
  }, [error, pending])

  // Display toast and navigate back after a delay
  const showToastAndNavigate = (message, type = "Success") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)

    // Navigate after showing the toast
    setTimeout(() => {
      history.push("/admin/practicas")
    }, 3000) // Give more time to see the toast
  }

  const addPractica = async (data) => {
    try {
      await dispatch(addPract(data))
      showToastAndNavigate("Práctica creada exitosamente")
    } catch (error) {
      console.error("Error al crear práctica", error)
      setToastMessage("Error al crear práctica")
      setToastType("Error")
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  const updatePractica = async (data) => {
    setIsLoading(true)
    try {
      await dispatch(updatePract(data))
      showToastAndNavigate("Práctica actualizada correctamente")
    } catch (error) {
      console.error("Error al actualizar práctica", error)
      setToastMessage("Error al actualizar práctica")
      setToastType("Error")
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (data) => {
    setFormData(data)
    setShowModal(true)
  }

  const confirmAction = () => {
    setIsLoading(true)
    setShowModal(false)
    if (!id) {
      addPractica(formData)
    } else {
      formData.id = id
      updatePractica(formData)
    }
  }

  // Function to handle closing the toast
  const handleCloseToast = () => {
    setShowToast(false)
  }

  return (
    <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5">
      <form
        className={`container d-flex flex-column align-items-center pb-4 rounded-3 ${styles.formContainer}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" pb={4} pt={3}>
          Práctica
        </Typography>
        <div
          className={`d-flex flex-column flex-md-row align-items-center justify-content-evenly ${styles.groupInput}`}
        >
          <Input
            labelText="Descripción"
            placeholder="Castración"
            type="text"
            name="descripcion"
            register={register}
            error={errors.descripcion?.message}
          />
        </div>
        <ButtonSubmit
          msg={isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "ENVIAR"}
          clickAction={() => {}}
          type="submit"
          disabled={isLoading}
        />
      </form>
      <ModalAlert
        text={id ? "¿Desea actualizar la práctica?" : "¿Desea crear práctica?"}
        clickAction={confirmAction}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showToast && <Toast title={toastType} message={toastMessage} setError={handleCloseToast} />}
    </div>
  )
}

export default FormPractica




