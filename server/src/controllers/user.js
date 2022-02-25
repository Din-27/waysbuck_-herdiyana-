const { user } = require("../../models");


exports.getUsers = async (req, res) => {
  try {
    let users = await user.findAll({
      attributes: {
        exclude:['status', 'password', 'createdAt', 'updatedAt']
      }
    })
    res.send({
      status: "Success",
      data : {
        users
      }
    })
  } catch (e) {
    console.log(e);
    res.send({
      status: "failed",
      message: "thats wrong",
    });
  }
}

exports.deleteUser = async (req, res) => {
  try{

      const {id} = req.params
      await user.destroy({
          where:{
              id
          }
      })
      res.send({
          status: 'success',
          message: `Delete user id: ${id} finished`,
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

exports.getUser = async (req, res) => {
  try{

      const {id} = req.params
      const data = await user.findOne({
          where:{
              id
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password"]
          }
      })
      res.send({
          status: 'success',
          data
      })
  }catch (error) {
          console.log(error)
          res.send({
              status: 'failed',
              message: 'Server Error'
          })
  }
}

exports.updateUser = async (req, res) => {
  try {
      let { id } = req.params;
      await user.update({name:req.body.name, email:req.body.email, image:req.file.filename},{
      where: {id},
    })
    let users = await user.findAll({
      where:{
        id: req.user.id
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userOrder", "user"]
      }
    })
    res.send({
      status: "success",
      users
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};


