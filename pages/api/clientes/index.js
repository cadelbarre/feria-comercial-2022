import prisma from '../../../lib/prisma'

export default async function handle (req, res) {
  const posts = await prisma.clientes.findMany({
    select: {
      nombreCliente: true,
      codigo: true
    }
  })
  res.json(posts)
}
