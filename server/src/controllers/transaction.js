const { order, transaction, user, product, toping } = require('../../models');



exports.getTransactions = async (req, res) => {
  try {
    let transactions = await transaction.findAll({
      attributes:{
        exclude:["updatedAt"]
      },
      include: [
        {
          model: order,
          as: "order",
          include:[
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
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
        },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
  });
  transactions = JSON.parse(JSON.stringify(transactions))
    transactions = transactions.map((item)=>{
      return {
        ...item,
        image: process.env.PATH_FILE + item.image
      }
    })
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


  exports.getTransaction = async (req, res) => {
    try {   const {id} = req.params;
            const data = await transaction.findOne({
            where: {
                id
            },
            include: [
              {
              model: order,
              as: "order",
              include:[
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
                }
              ],
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
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

  exports.updateTransaction = async (req, res) => {
    try {   
            let {id} = req.params
            await transaction.update({status: "Success"}, {
            where: {id}})
            const data = await transaction.findOne({
            where: {
                id
            },
            include: [
              {
              model: order,
              as: "order",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "user"],
              },
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt",  "price", "topingOrder", "order", "userOrder"]
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
  exports.updateTransactionOTW = async (req, res) => {
    try {   
            let {id} = req.params
            await transaction.update({status: "On The Way"}, {
            where: {id}})
            const data = await transaction.findOne({
            where: {
                id
            },
            include: [
              {
              model: order,
              as: "order",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "user"],
              },
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt",  "price", "topingOrder", "order", "userOrder"]
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
  exports.updateTransactionCancel = async (req, res) => {
    try {   
            let {id} = req.params
            await transaction.update({status: "Cancel"}, {
            where: {id}})
            const data = await transaction.findOne({
            where: {
                id
            },
            include: [
              {
              model: order,
              as: "order",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "user"],
              },
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt",  "price", "topingOrder", "order", "userOrder"]
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
  

  exports.deleteTransaction = async (req, res) => {
    try{
        const {id} = req.params
        await transaction.destroy({
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


  exports.addToCart = async (req, res) => {
    try {
        let {id} = req.params
        let data = req.body
        let add = await transaction.create({
            ...data,
            status: "waiting approve",
            image: req.file.filename,
            idOrder: id,
            include: {
                model: order,
                as: "order",
                attributes: {
                exclude: ["createdAt", "updatedAt"],
                }
            },
            attributes: {
            exclude: ["createdAt", "updatedAt"]
            }
        })
        // await order.destroy({ where: { id } });
        res.send({
            status: "Success",
            add
        })
    }catch (e) {
    console.log(e);
    res.send({
        status: "failed",
         message: "thats wrong",
        });
    }
};

  // exports.getTransactionUser = async (req, res) => {
  //   try {

  //       let transactions = await transaction.findOne({
  //         where:{
  //           id: `${req.user.id}`
  //         },
  //       include: [
  //         {
  //           model: order,
  //           as: "order",
  //           attributes: {
  //             exclude: ["createdAt", "updatedAt"],
  //           }
  //         },
  //       ],
  //       status: req.body,
  //       attributes: {
  //         exclude: ["createdAt", "updatedAt", "price", "topingOrder", "order", "userOrder"]
  //       },
  //     });
  //     res.send({
  //       status: "success...",
  //       data:{
  //           transactions,
            
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.send({
  //       status: "failed",
  //       message: "Server Error",
  //     });
  //   }
  // };