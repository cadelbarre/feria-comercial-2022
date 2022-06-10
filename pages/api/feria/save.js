import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle (req, res) {
  const { body } = req
  const { bonoAlmuerzo, bonoRefrigerio, bonoTransporte, ...rest } = body

  const data = {
    bonoAlmuerzo: Number(bonoAlmuerzo),
    bonoRefrigerio: Number(bonoRefrigerio),
    bonoTransporte: Number(bonoTransporte),
    ...rest
  }
  console.log(data)

  try {
    const response = await prisma.clientesFeria.create({
      data
    })
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
