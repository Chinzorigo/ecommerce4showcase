const Order = require("../models/Order");

exports.getOrders = async(req, res) => {
    try {
        const orders = await Order.find();

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message || err
        });
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order) throw new Error(`${req.params.id} ID-тай захиалга олдсонгүй.`)

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (err) {
        return res.status(400).json( {
            success: false,
            error: err.message || err
        });
    }
};

exports.createOrder = async(req, res) => {
    console.log("data: ", req.body);

    try {
        const order = await Order.create(req.body);

        return res.status(200).json({
            sucess: true,
            data: order
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message || err
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!order) throw new Error(`${req.params.id} ID-тай захиалга олдсонгүй.`);

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message || err
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) throw new Error(`${req.params.id} ID-тай захиалга олдсонгүй.`);

        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message || err
        })
    }
}

