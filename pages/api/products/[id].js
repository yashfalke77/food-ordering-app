import dbConnect from '../../../lib/mongo'
import Product from '../../../models/Product'

export default async function ProxyHandler(req, res) {
    const { method, query: { id } } = req

    dbConnect()

    if (method === 'GET') {
        try {
            const product = await Product.findById(id)
            res.status(200).json({ response: product })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    if (method === 'PUT') {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body)
            res.status(200).json({ response: updatedProduct })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    if (method === 'DELETE') {
        try {
            const deletedProducts = await Product.findByIdAndDelete(id)
            res.status(200).json({ response: deletedProducts })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}