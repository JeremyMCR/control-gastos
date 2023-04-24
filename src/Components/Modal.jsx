import CerrarBtn from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setanimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')  

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
    }
  }, [])

  const ocultarModal = () => {
    setanimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
        setModal(false)
    }, 600)
  }  

  const handleSubmit = e => {
    e.preventDefault()

    if([ nombre, cantidad, categoria ].includes('')){
        setMensaje("Todos los campos son obligatorios")

        setTimeout(() => {
            setMensaje("")
        },1500)
        return;
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})

  }

  return (
    <div className="modal ">
        <div className="cerrar-modal">
            <img src={CerrarBtn}
            alt="cerrar modal"
            onClick={ocultarModal}
             />
        </div>

        <form className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
              onSubmit={handleSubmit}
        >
            <legend>{ gastoEditar.id ? "Editar gasto" : "Nuevo gasto"}</legend>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre gasto</label>

                <input type="text" 
                       id='nombre'
                       placeholder='Añade el nombre del gasto'
                       value={nombre}
                       onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input type="number" 
                       id='cantidad'
                       placeholder='Añade la cantidad del gasto: ej.1000'
                       value = {cantidad}
                       onChange={e => setCantidad(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>

                <select id = "categoria"
                        value = {categoria}
                        onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input type="submit" 
                   value= {gastoEditar.nombre ? "Editar gasto" : "Añadir gasto"}
            />

        </form>
    </div>
  )
}

export default Modal