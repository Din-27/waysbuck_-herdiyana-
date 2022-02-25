const { profile, user } = require('../../models')


exports.addToCart = async (req, res) => {
    try {
        let data = req.body
        let profiles = await profile.create({
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
        res.send({
            status: "Success",
            profiles
        })
    }catch (e) {
    console.log(e);
    res.send({
        status: "failed",
         message: "thats wrong",
        });
    }
};