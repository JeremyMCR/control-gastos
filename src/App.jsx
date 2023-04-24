import { useState, useEffect } from 'react'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Header from './Components/Header'
import Modal from './Components/Modal'
import Filtros from './Components/Filtros'
import ListadoGastos from './Components/ListadoGastos'
import { generarId } from './helpers'

function App() {

  //Uso del local storage
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
  const gastosLS = localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')):[];

  const [presupuesto, setPresupuesto] = useState(presupuestoLS)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setanimarModal] = useState(false)

  const [gastos, setGastos] = useState(gastosLS)
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //Guarda el presupuesto en local storage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto])

  //Carga los datos desde el local storage
  useEffect(() =>{
    if(presupuestoLS > 0){
       setIsValidPresupuesto(true)
    }
  }, [])

  //Guarda los gastos en localstorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos])

  //Editar los gastos
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() => { 
        setanimarModal(true)
      }, 300);
    }
  }, [gastoEditar])

  //Filtrar los gastos por categoria
  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setGastoEditar({})
    setModal(true)

    setTimeout(() => { 
      setanimarModal(true)
    }, 300);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setanimarModal(false)

    setTimeout(() => {
        setModal(false)
    }, 600)
  }

  const eliminarGasto = id => {
    const gastosActualizados  = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos = {gastos}
        setGastos = {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>
          <img
            src={IconoNuevoGasto}
            alt='Icono nuevo gasto'
            onClick={handleNuevoGasto}
          />
          </div>
        </>
      )}
      
      {modal && <Modal
        setModal = {setModal}
        animarModal = {animarModal}
        setanimarModal = {setanimarModal}
        guardarGasto = {guardarGasto}
        gastoEditar = {gastoEditar}
        setGastoEditar = {setGastoEditar}
      />}

    </div>
  )
}

export default App
