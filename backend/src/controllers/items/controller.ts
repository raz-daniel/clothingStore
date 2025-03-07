import { NextFunction, Response, Request } from "express";
import Item from "../../model/item";
import Category from "../../model/category";



export async function getAllItems(req: Request, res: Response, next: NextFunction) {
    try {
        const items = await Item.findAll({
            include: [ Category ]
        }) 
        res.json(items)
    } catch (error) {
        next(error)
    }
}

export async function getItemsPerCategory(req: Request<{ categoryId: string }>, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params
        const items = await Item.findAll({
            where: {categoryId},
            include: [Category]
        })
        res.json(items)
    } catch (error) {
        next(error)
    }
}

export async function getItemsPerPrice(req: Request, res: Response, next: NextFunction) {
    try {
        const price = Number(req.query.price)
        const items = await Item.findAll({
            where: {price},
            include: [Category]
        })
        res.json(items)
    } catch (error) {
        next(error)
    }
}

export async function getItemsPerIsRecycled(req: Request, res: Response, next: NextFunction) {
    try {
        const isRecycled = req.query.isRecycled === 'true'
        const items = await Item.findAll({
            where: {isRecycled},
            include: [Category]
        })
        res.json(items)
    } catch (error) {
        next(error)
    }
}


export async function addItem(req: Request<{}, {}, {
    name: string,
    isRecycled: boolean,
    categoryId: string,
    date: Date,
    price: number,
    discount: number
}>, res: Response, next: NextFunction) {
    try {
        const newItem = await Item.create(req.body)
        res.json(newItem)
    } catch (error) {
        next(error)
    }
}

export async function editItem(req: Request<{ id: string}, {}, {
    name: string,
    isRecycled: boolean,
    categoryId: string,
    date: Date,
    price: number,
    discount: number
}>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        await Item.update(req.body, {where: {id}})
        res.json({success: true})
    } catch (error) {
        next(error)
    }
}

export async function removeItem(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        await Item.destroy({where: {id}})
        res.json({success: true})
    } catch (error) {
        next(error)
    }
}