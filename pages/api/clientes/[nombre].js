import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  const { nombre } = req.query

  try {
    const posts = await prisma.clientes.findMany({
      where: {
        nombreCliente: nombre
      },
      select: {
        ciudad: true,
        direccion: true,
        telefono: true,
        celular: true,
        contacto: true
      }
    })
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
