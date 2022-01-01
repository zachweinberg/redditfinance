import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).end()
  }

  if (!req.body.name || !req.body.url || !req.body.description) {
    return res.status(400).end()
  }

  await twilioClient.messages.create({
    body: `NEW REDDIT FINANCE REQUEST:\n\nSUB: ${req.body.name}\n\nURL: ${req.body.url}\n\nDESCRIPTION:${req.body.description}`,
    to: process.env.ZACH_CELL!,
    from: process.env.TWILIO_NUMBER,
  })

  res.status(200).end()
}

export default handler
