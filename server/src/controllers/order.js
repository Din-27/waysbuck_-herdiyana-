const {user, product, toping, order } = require('../../models')

exports.getOrders = async (req, res) => {
      try {
          let transactions = await order.findAll({
            attributes:{
              exclude:["updatedAt", "idBuyer", "idSeller", "idProduct"]
            },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }
            },
            {
              model: toping,
              as: "toping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }
            },
          ],
          // status: req.body,
          attributes: {
            exclude: ["createdAt", "updatedAt", "price", "topingOrder", "order", "userOrder"]
          },
        });
        res.send({
          status: "success...",
          data:{
              transactions,
              
          }
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Server Error",
        });
      }
    };

exports.addOrder = async (req, res) => {
  try {
    let data = req.body;
    data = {
      ...data,
      idUser: req.user.id
    }
  await order.create(data)
    res.send({
      status: "Success",
      message: "Add Cart finished"
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: "failed",
      message: "thats wrong",
    });
  }
};

exports.getOrderUser = async (req, res) => {
  try {

      let data = await order.findAll({
        where:{
          idUser: `${req.user.id}`
        },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        },
        {
          model: toping,
          as: "toping",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "price", "topingOrder", "order", "userOrder"]
      },
    });
    
    data = JSON.parse(JSON.stringify(data))
    data = data.map((item)=>{
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })

    res.send({
      status: "success...",
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try{

      const {id} = req.params
      await order.destroy({
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

exports.getOrder = async (req, res) => {
  try {   const {id} = req.params;
          const data = await order.findOne({
          where: {
              id
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }
            },
            {
              model: toping,
              as: "toping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              }
            },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt",]
        }
      })
      res.send({
          status: 'success',
          data: {
              data
          }
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}

exports.deleteOrderUser = async (req, res) => {
  try{

      const {id} = req.params
      await order.destroy({
          where:{
              idUser: req.user.id
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