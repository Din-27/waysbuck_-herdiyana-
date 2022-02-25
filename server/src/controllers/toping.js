const { toping, product } = require('../../models')

exports.getTopings = async (req, res) => {
  try {
    let data = await toping.findAll({
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

exports.getToping = async (req, res) => {
  try {   const {id} = req.params;
          let data = await toping.findOne({
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

exports.addToping = async (req, res) => {
  try {
    let data = req.body
    let addToping = await toping.create({
      ...data,
      image: req.file.filename,
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
    })
    addToping = JSON.parse(JSON.stringify(addToping))
    addToping = {
        ...addToping,
        image: process.env.FILE_PATH + addToping.image,
    }
    res.send({
      status: "Success",
      data : {
        toping:{
          name: req.body.name,
          price: req.body.price,
          image: req.file.filename,
          image: process.env.FILE_PATH + addToping.image,
        }
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

exports.updateToping = async (req, res) => {
  try {
    let {id} = req.params
      await toping.update({name:req.body.name, price:req.body.price, image:req.file.filename}, {
        where:{ id },
      })
      let topings = await toping.findAll({
      where:{
        id    
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    })
    res.send({
      status: "success",
      topings
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteToping = async (req, res) => {
  try{

      const {id} = req.params
      await toping.destroy({
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