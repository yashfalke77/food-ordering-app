import dbConnect from '../../../lib/mongo'
import Order from '../../../models/Order'

export default async function ProxyHandler(req, res) {
    const { method } = req

    dbConnect()

    if (method === 'POST') {
        console.log(req.body)
        try {
            const order = await Order.create(req.body)
            res.status(200).json({ response: order })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    if (method === 'GET') {
        try {
            const allOrders = await Order.find({})
            res.status(200).json({ response: allOrders })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}