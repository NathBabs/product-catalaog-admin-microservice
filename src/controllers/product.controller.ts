import { Request, Response, NextFunction } from 'express';
import { retrieveProducts, insertProduct, retrieveAProduct, changeProduct, removeProduct, likeProduct } from '../services/product.service';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    retrieveProducts().then(result => {
        res.status(result.statusCode).send({
            status: true,
            data: result.data
        });
    }).catch(error => { 
        next(error);
    });
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => { 
    insertProduct(req.body).then(result => {
        res.status(result.statusCode).send({
            status: true,
            data: result.data
        });
    }).catch(error => { 
        next(error);
    });
}

export const getAProduct = async (req: Request, res: Response, next: NextFunction) => { 
    retrieveAProduct(req.params.id).then(result => {
        res.status(result.statusCode).send({
            status: true,
            data: result.data
        });
    }).catch(error => { 
        next(error);
    });
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => { 
    changeProduct(req.params.id, req.body).then(result => {
        res.status(result.statusCode).send({
            status: true,
            data: result.data
        });
    }).catch(error => { 
        next(error);
    });
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => { 
    removeProduct(req.params.id).then(result => {
        res.status(result.statusCode).send({
            status: true,
            data: result.data
        });
    }).catch(error => { 
        next(error);
    });
}

export const likeAProduct = async (req: Request, res: Response, next: NextFunction) => { 
    likeProduct(req.params.id).then(result => {
        res.status(result.statusCode).send({
            status: true,
            data: result.data
        });
    }).catch(error => { 
        next(error);
    });
}