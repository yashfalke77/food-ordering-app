import dbConnect from '../../../lib/mongo'
import Order from '../../../models/Order'

export default async function ProxyHandler(req, res) {
    const { method, query: { id } } = req

    dbConnect()

    if (method === 'GET') {
        try {
            const order = await Order.findById(id)
            res.status(200).json({ response: order })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    if (method === 'PUT') {
        try {
            console.log(req.body)
            const updatedOrder = await Order.findByIdAndUpdate(id, req.body)
            res.status(200).json({ response: updatedOrder })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    if (method === 'DELETE') {
        try {
            const deletedOrders = await Order.findByIdAndDelete(id)
            res.status(200).json({ response: deletedOrders })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}