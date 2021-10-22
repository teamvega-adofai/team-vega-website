import { NextApiHandler } from 'next'
import { requireAdminApi } from '../../../../../utils/auth'
import prisma from '../../../../../utils/prisma'

const store: NextApiHandler = requireAdminApi(async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  try {
    await prisma.page.update({
      where: {
        id: req.query.id as string
      },
      data: {
        data: req.body
      }
    })
    res.json({ ok: 1 })
  } catch (e) {
    res.json({ ok: 0 })
  }
})

export default store
