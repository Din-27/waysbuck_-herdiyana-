const { product, user } = require('../../models');



exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
    });
    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      }
    })

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {   const {id} = req.params;
          let data = await product.findOne({
          where: {
              id
          },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })
      data = JSON.parse(JSON.stringify(data))
      data = {
          ...data,
          image: process.env.FILE_PATH + data.image,
      }
      res.send({
          status: 'success',
          data
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}

  exports.addProduct = async (req, res) => {
    try {
    let data = req.body
    let products = await product.create({
      ...data,
      image: req.file.filename,
      idUser: `${req.user.id}`,
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        }
      },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
    })
    products = JSON.parse(JSON.stringify(products))
    products = {
        ...products,
        image: process.env.FILE_PATH + products.image,
    }
      res.send({
        status: "Success",
        data : {
          products,
        }
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        status: "failed",
        message: "thats wrong",
      });
    }
  };

  exports.updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        await product.update({name:req.body.name, price:req.body.price, image:req.file.filename},{
        where: {id},
      })
      let products = await product.findAll({
        where:{
          id
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "userOrder", "user"]
        }
      })
      res.send({
        status: "success",
        products
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try{
  
        const {id} = req.params
        await product.destroy({
            where:{
                id
            },
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        })
        res.send({
            status: 'success',
            data: {
              id:id
            }
        })
    }catch (error) {
            console.log(error)
            res.send({
                status: 'failed',
                message: 'Server Error'
            })
    }
  }
