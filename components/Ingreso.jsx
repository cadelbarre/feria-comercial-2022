import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

export default function Ingreso () {
  const { register, handleSubmit, setValue, reset } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [clientes, setClientes] = useState([])

  const onSubmit = async (data) => {
    setIsLoading(prev => !prev)
    const response = await fetch('/api/feria/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const { status, statusText } = response
    if (status === 200 && statusText === 'OK') {
      reset()
    }
    setIsLoading(prev => !prev)
  }

  const isEmpty = (string) => string.length === 0

  const handleBlur = async (e) => {
    setIsLoading(prev => !prev)
    const { value } = e.target

    if (isEmpty(value)) {
      setIsLoading(prev => !prev)
      return
    }

    const response = await fetch(`/api/clientes/${value}`)
    const json = await response.json()

    const { contacto, ciudad, direccion, celular, telefono } = json[0]
    setValue('contacto', contacto)
    setValue('direccion', direccion)
    setValue('ciudad', ciudad)
    setValue('celular', celular)
    setValue('telefono', telefono)

    setIsLoading(prev => !prev)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/clientes')
      .then(res => res.json())
      .then(res => {
        setIsLoading(false)
        setClientes(res)
      })
  }, [])

  return (
    <section className='card'>
      <h2 className='text-4xl text-center font-semibold mb-6'>
        Ingreso Clientes
      </h2>

      {isLoading && <p className='text-center'>Cargando... 🚀</p>}

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div className='flex flex-col sm:flex-row gap-4'>

          <div className='flex flex-col sm:w-3/5'>
            <label htmlFor='drogueria'>Nombre Drogueria</label>
            <input
              className='input' type='text'
              list='clientes'
              {...register('drogueria', { required: true })}
              onBlur={(e) => handleBlur(e)}
              disabled={isLoading && 'disabled'}
            />
            <datalist id='clientes'>
              {
                clientes.map(({ nombreCliente, codigo }) => {
                  return (
                    <option value={nombreCliente} key={codigo} />
                  )
                })
            }
            </datalist>
          </div>

          <div className='flex flex-col sm:w-2/5'>
            <label htmlFor='contacto'>Nombre Cliente</label>
            <input className='input' type='text' {...register('contacto', { required: true })} disabled={isLoading && 'disabled'} />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 min-w-full'>
          <div className='flex flex-col sm:w-1/2'>
            <label htmlFor='direccion'>Direccion</label>
            <input className='input' type='text' {...register('direccion', { required: true })} disabled={isLoading && 'disabled'} />
          </div>

          <div className='flex flex-col sm:w-1/2'>
            <label htmlFor='ciudad'>Ciudad</label>
            <input className='input' type='text' {...register('ciudad', { required: true })} disabled={isLoading && 'disabled'} />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 min-w-full'>
          <div className='flex flex-col sm:w-1/2'>
            <label htmlFor='celular'>Celular</label>
            <input className='input' type='text' {...register('celular')} disabled={isLoading && 'disabled'} />
          </div>

          <div className='flex flex-col sm:w-1/2'>
            <label htmlFor='telefono'>Telefono</label>
            <input className='input' type='text' {...register('telefono')} disabled={isLoading && 'disabled'} />
          </div>
        </div>

        <div className='flex flex-row gap-4 mt-2'>
          <div className='flex flex-col w-1/3'>
            <label htmlFor='bonoTransporte'>Bono Transporte</label>
            <input
              className='input' type='number'
              defaultValue={1}
              {...register('bonoTransporte', { required: true, min: 1, max: 10 })}
              disabled={isLoading && 'disabled'}
            />
          </div>

          <div className='flex flex-col w-1/3'>
            <label htmlFor='bonoAlmuerzo'>Bono Almuerzo</label>
            <input
              className='input' type='number'
              min={1} max={10}
              defaultValue={1}
              {...register('bonoAlmuerzo', { required: true, min: 1, max: 10 })}
              disabled={isLoading && 'disabled'}
            />
          </div>

          <div className='flex flex-col w-1/3'>
            <label htmlFor='bonoRefrigerio'>Bono Refrigerio</label>
            <input
              className='input' type='number'
              defaultValue={1}
              {...register('bonoRefrigerio', { required: true, min: 1, max: 10 })}
              disabled={isLoading && 'disabled'}
            />
          </div>
        </div>

        <div className='text-center mt-6'>
          <button className='button white' disabled={isLoading && 'disabled'} onClick={() => reset()}>Limpiar</button>
          <input className='button cursor-pointer ml-4' disabled={isLoading && 'disabled'} type='submit' />
        </div>
      </form>
    </section>
  )
}
