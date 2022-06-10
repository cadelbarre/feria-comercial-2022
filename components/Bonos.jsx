import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Bonos () {
  const { data, error } = useSWR('/api/feria/bonos', fetcher, { refreshInterval: 10000 })

  const body = [
    { title: 'Clientes Ingresados', value: data?._count?.drogueria ?? 0, icon: '🧑‍🤝‍🧑' },
    { title: 'Bonos Almuerzos', value: data?._sum?.bonoAlmuerzo ?? 0, icon: '🍖' },
    { title: 'Bonos Refrigerio', value: data?._sum?.bonoRefrigerio ?? 0, icon: '🍹' },
    { title: 'Bonos Transporte', value: data?._sum?.bonoTransporte ?? 0, icon: '🚌' }
  ]

  if (error) return <div className='card'>failed to load ... 🙄</div>
  if (!data) return <div className='card'>loading... ⏳</div>

  return (
    <div className='card'>
      <h1 className='text-2xl text-center mb-6 font-semibold tracking-tight'>Control de Ingreso y Bonos</h1>
      <div className='flex flex-row justify-between items-center'>
        {
         body.map(({ title, value, icon }) => {
           return (
             <div key={title} className='flex flex-col items-center mb-3'>
               <p className='text-3xl'>{value}</p>
               <h2 className='text-base font-semibold text-slate-800'>{icon} {title}</h2>
             </div>
           )
         })
      }
      </div>
    </div>
  )
}
