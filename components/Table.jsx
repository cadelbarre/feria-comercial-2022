import { useTable } from 'react-table'
import useRows from '../hook/useRows'
import useColumns from '../hook/useColumns'

export default function Table ({ header, body }) {
  const columns = useColumns(header)
  const data = useRows(body)
  const table = useTable({ columns, data })

  const lengthColumns = columns.length

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table

  return (
    <table {...getTableProps()} className='responsive border-collapse table-auto w-full my-2 lg:my-3'>
      <thead className='bg-blue-600'>
        {
           // Recorremos las columnas que previamente definimos
           headerGroups.map(headerGroup => (
             /* eslint-disable react/jsx-key */
             // Añadimos las propiedades al conjunto de columnas
             <tr {...headerGroup.getHeaderGroupProps()} className='absolute -top-[9999px] -left-[-9999px] odd:bg-blue-700 md:relative md:-top-0 md:-left-0 md:odd:bg-transparent'>
               {
                 // Recorremos cada columna del conjunto para acceder a su información
                 headerGroup.headers.map((column) => (
                   // Añadimos las propiedades a cada celda de la cabecera
                   <th {...column.getHeaderProps()} className='border-b font-medium p-1 pl-2 py-1 sm:p-2 sm:pl-3 sm:py-3 text-white text-left text-xs md:text-sm' key={column.Header}>
                     {
                       // Pintamos el título de nuestra columna (propiedad "Header")
                       column.render('Header')
                     }
                   </th>
                 ))
               }
             </tr>
           ))
         }
      </thead>

      {/* Añadimos las propiedades al cuerpo de la tabla */}
      <tbody {...getTableBodyProps()} className='bg-white'>
        {
           // Recorremos las filas
           rows.map(row => {
             // Llamamos a la función que prepara la fila previo renderizado
             prepareRow(row)
             return (
               // Añadimos las propiedades a la fila
               <tr {...row.getRowProps()} className='odd:bg-slate-100/80'>
                 {
                   // Recorremos cada celda de la fila
                   row.cells.map((cell) => {
                     // Añadimos las propiedades a cada celda de la fila
                     return (
                       <td {...cell.getCellProps()} data-th={cell.column.Header} className='row-responsive border-b border-slate-200 p-2 pl-3 lg:p-3 lg:pl-4 text-slate-800 text-xs lg:text-sm break-words'>
                         {
                           // Pintamos el contenido de la celda
                           cell.render('Cell')
                         }
                       </td>
                     )
                   })
                 }
               </tr>
             )
           })
         }
      </tbody>
      {
        !data.length && (
          <tfoot>
            <tr>
              <td colSpan={lengthColumns} className='text-center text-slate-700 py-6 text-xs md:text-sm bg-white w-full'>No tiene Información disponible</td>
            </tr>
          </tfoot>
        )
      }

    </table>
  )
}
