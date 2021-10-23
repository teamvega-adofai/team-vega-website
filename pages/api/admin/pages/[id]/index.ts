import { NextApiHandler } from 'next'
import { requireAdminApi } from '../../../../../utils/auth'
import prisma from '../../../../../utils/prisma'

const store: NextApiHandler = requireAdminApi(async (req, res) => {
  if (!['GET', 'DELETE'].includes(<string>req.method))
    return res.status(405).json({ error: 'Method Not Allowed' })
  const i = await prisma.page.findUnique({
    where: {
      id: req.query.id as string
    }
  })

  if (!i) {
    return res.status(404).json({ error: 'Not found.' })
  }

  if (req.method === 'DELETE') {
    await prisma.page.delete({
      where: {
        id: i.id
      }
    })
    return res.status(200).json({ ok: 1 })
  }

  return res.status(200).json(i.data)
})

export default store
