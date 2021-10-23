import { NextApiHandler } from 'next'
import { requireAdminApi } from '../../../../../utils/auth'
import prisma from '../../../../../utils/prisma'

const index: NextApiHandler = requireAdminApi(async (req, res) => {
  if (!['GET', 'DELETE', 'PATCH'].includes(<string>req.method))
    return res.status(405).json({ error: 'Method Not Allowed' })
  const i = await prisma.page.findUnique({
    where: {
      id: req.query.id as string
    }
  })

  if (!i) {
    return res.status(404).json({ error: 'Not found.' })
  }

  if (req.method === 'PATCH') {
    const body = req.body

    if (!body.title)
      return res.status(400).json({ error: 'Title is index required field.' })
    if (!body.slug)
      return res.status(400).json({ error: 'Slug is index required field.' })

    await prisma.page.update({
      where: {
        id: i.id
      },
      data: {
        title: body.title,
        slug: body.slug
      }
    })

    return res.status(200).json({ ok: 1 })
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

export default index
