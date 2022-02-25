const { order, transaction, user } = require('../../models');


exports.getTransactions = async (req, res) => {
    try {
        let transactions = await transaction.findAll({
          attributes:{
            exclude:["updatedAt", "createdAt"]
          },
        include: [
          {
            model: order,
            as: "order",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          }
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "price"]
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
            await transaction.update(req.body,{
            where: {id}})
            const data = await transaction.findOne({
            where: {
                id
            },
            include: [
              {
              model: user,
              as: "user",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password", "user"],
              },
            },
              {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt", "userOrder"],
              },
            },
              {
              model: toping,
              as: "toping",
              attributes: {
                exclude: ["createdAt", "updatedAt", "order", "userOrder"],
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