import prisma from '../../client';
import { customError } from '../utils/CustomError';
import { Prisma } from '@prisma/client';
import { MessageBroker } from '../broker/rabbitmq';

const message = new MessageBroker();
let broker: MessageBroker;
(async () => {
  broker = await message.init();
})();


export const retrieveProducts = async () => {
  try {
    const products = await prisma.product.findMany();

    return Promise.resolve({
      statusCode: 200,
      data: products,
    });
  } catch (error: any) {
      return Promise.reject(
        customError({
          message: error.message || 'Something went wrong',
          statusCode: 500,
        })
    );
  }
};

export const insertProduct = async (product: Prisma.ProductCreateInput) => { 
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...product,
      },
    });
    broker.sendMessage('product-created', JSON.stringify(newProduct));


    return Promise.resolve({
      statusCode: 200,
      data: newProduct,
    });
    
  } catch (error: any) {
      return Promise.reject(
        customError({
          message: error.message || 'Something went wrong',
          statusCode: 500,
        })
    );
  }
}
  
export const retrieveAProduct = async (id: string) => { 
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    return Promise.resolve({
      statusCode: 200,
      data: product,
    });
    
  } catch (error: any) {
      return Promise.reject(
        customError({
          message: error.message || 'Something went wrong',
          statusCode: 500,
        })
    );
  }
};


export const changeProduct = async (id: string, product: Prisma.ProductUpdateInput) => { 
  try {
    // check if product exists, if not return error
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(id),
      }
    });

    if (!existingProduct) { 
      return Promise.reject(
        customError({
          message: 'Product not found',
          statusCode: 404,
        })
    );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        ...product,
      },
    });

    // send updated product to queue
    broker.sendMessage('product-updated', JSON.stringify(updatedProduct));

    return Promise.resolve({
      statusCode: 200,
      data: updatedProduct,
    });
    
  } catch (error: any) {
      return Promise.reject(
        customError({
          message: error.message || 'Something went wrong',
          statusCode: 500,
        })
    );
  }
}

export const removeProduct = async (id: string) => { 
  try {
    // check if product exists, if not return error
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(id),
      }
    });

    if (!existingProduct) { 
      return Promise.reject(
        customError({
          message: 'Product not found',
          statusCode: 404,
        })
    );}

    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    // send deleted product id to queue
    broker.sendMessage('product-deleted', JSON.stringify(deletedProduct.id));

    return Promise.resolve({
      statusCode: 200,
      data: deletedProduct,
    });
    
  } catch (error: any) {
      return Promise.reject(
        customError({
          message: error.message || 'Something went wrong',
          statusCode: 500,
        })
    );
  }
}

// like a product
export const likeProduct = async (id: string) => {
  try {
    // check if product exists, if not return error
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(id),
      }
    });

    if (!existingProduct) {
      return Promise.reject(
        customError({
          message: 'Product not found',
          statusCode: 404,
        }));
    }
    
    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        likes: {
          increment: 1,
        },
      }
    });

    return Promise.resolve({
      statusCode: 200,
      data: updatedProduct,
    });
  } catch (error: any) {
    return Promise.reject(
      customError({
        message: error.message || 'Something went wrong',
        statusCode: 500,
      })
    );
  }
}