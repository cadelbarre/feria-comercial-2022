import prisma from '../../../lib/prisma'

export default async function handle (req, res) {
  try {
    const aggregations = await prisma.clientesFeria.aggregate({
      _sum: {
        bonoAlmuerzo: true,
        bonoTransporte: true,
        bonoRefrigerio: true
      },
      _count: {
        drogueria: true
      }
    })

    res.json(aggregations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
