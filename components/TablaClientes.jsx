import Table from './Table'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function TablaClientes () {
  const { data, error } = useSWR('/api/feria', fetcher, { refreshInterval: 120000 })

  if (error) return <div className='card mt-4'>failed to load ... 🙄</div>
  if (!data) return <div className='card mt-4'>loading... ⏳</div>

  const formatTime = (time) => {
    return new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(time))
  }

  const columns = [
    { Header: 'Nombre Cliente', accessor: 'drogueria' },
    { Header: 'B. Almuerzo', accessor: 'bonoAlmuerzo' },
    { Header: 'B. Refrigerio', accessor: 'bonoRefrigerio' },
    { Header: 'B. Transporte', accessor: 'bonoTransporte' },
    { Header: 'Llegada', accessor: ({ creado }) => formatTime(creado) }
  ]

  return (
    <section className='card'>
      <Table header={columns} body={data} />
    </section>
  )
}
