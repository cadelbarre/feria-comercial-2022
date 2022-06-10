import prisma from '../../../lib/prisma'

export default async function handle (req, res) {
  try {
    const data = await prisma.clientesFeria.findMany({
      select: {
        drogueria: true,
        bonoAlmuerzo: true,
        bonoRefrigerio: true,
        bonoTransporte: true,
        creado: true,
        id: true
      },
      orderBy: [{ id: 'desc' }]
    })
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
