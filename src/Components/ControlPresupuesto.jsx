
import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Swal from 'sweetalert2'

const ControlPresupuesto = ({
  gastos, 
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const handleResetApp = () => {
    Swal.fire({
      title: '¿Seguro que desea reiniciar el presupuesto y los gastos?',
      icon : 'warning',
      showDenyButton: true,
      confirmButtonText: 'Resetear',
      confirmButtonColor: '#be4d25',
      denyButtonText: `Cancelar`,
      denyButtonColor: '#3730a3',
    }).then((resultado) => {
      /* Read more about isConfirmed, isDenied below */
      if (resultado.isConfirmed) {
        Swal.fire('Presupuesto reiniciado', '', 'success')
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      } else if (resultado.isDenied) {
        MySwal.fire('Se conservo el presupuesto', '', 'info')
      }
    })
  }

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + Number(total), 0);
    const totalDisponible = presupuesto - totalGastado

    //Funcion que calcula el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setTimeout(() =>{
      setPorcentaje(nuevoPorcentaje)
    }, 900)
  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-CR', {
      style: 'currency',
      currency: 'CRC'
    })
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
              value = {porcentaje}
              styles={buildStyles({
                  pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                  trailColor: '#F5F5F5',
                  textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
              })}
              text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
          <button
            className='reset-app'
            type='button'
            onClick={handleResetApp}
          >
              Resetear App
          </button>
          <p>
            <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
          </p>

          <p className={`${disponible < 0 ? 'negativo' : '' }`}>
            <span>Disponible: </span> {formatearCantidad(disponible)}
          </p>

          <p>
            <span>Gastado: </span> {formatearCantidad(gastado)}
          </p>

        </div>
    </div>
  )
}

export default ControlPresupuesto