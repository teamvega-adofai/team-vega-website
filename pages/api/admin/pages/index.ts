import { NextApiHandler } from 'next'
import { requireAdminApi } from '../../../../utils/auth'
import prisma from '../../../../utils/prisma'

const store: NextApiHandler = requireAdminApi(async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  const body = req.body
  if (!body.title)
    return res.status(400).json({ error: 'Title is a required field' })
  if (!body.slug)
    return res.status(400).json({ error: 'Slug is a required field' })
  try {
    const data = await prisma.page.create({
      data: {
        data: {},
        title: body.title,
        slug: body.slug.toLowerCase()
      }
    })
    return res.status(200).json({
      id: data.id
    })
  } catch (e: any) {
    return res.status(500).json({
      error: `${e}`
    })
  }
})

export default store
