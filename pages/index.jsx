import Head from 'next/head'
import Bonos from '../components/Bonos.jsx'
import Ingreso from '../components/Ingreso.jsx'
import TablaClientes from '../components/TablaClientes.jsx'

export default function Home () {
  return (
    <div className='p-4 sm:p-8 max-w-4xl m-auto'>
      <Head>
        <title>Feria Comercial 2022</title>
        <meta name='description' content='Ingreso Clientes en la Feria Comercial' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='flex flex-col gap-5'>
        <Ingreso />
        <Bonos />
        <TablaClientes />
      </section>

    </div>
  )
}
