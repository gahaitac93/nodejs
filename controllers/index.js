const models = require("../models");

const { Op } = require("sequelize");

const getAllPosts = async (req, res) => {
    try {
        let limit = 5;   // number of records per page
        let offset = 0;
        let page = req.query.page;// page number
        let post;
        let options = {
            include: {
                model: models.Comment,
                as: 'comments'
            },
            order: [
                ['createdAt', 'DESC']
            ]
        };
        if(req.query.id) {
            options.where = {
                id: {
                    [Op.eq]: req.query.id
                }
            };
        }
        if(req.query.keyword) {
            options.where = {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `${req.query.keyword}%`
                        }
                    },
                    {
                        content: {
                            [Op.like]: `${req.query.keyword}%`
                        }
                    }
                ]
            };
        }
        let data = await models.Post.findAndCountAll();
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        if (req.query.page) {
            options.offset = offset;
            options.limit = limit;
        }
        post = await models.Post.findAll(options);
        return res.status(200).json({'result': post, 'count': data.count, 'pages': pages});
    } catch (error) {
        return res.status(500).send(e.message);
    }
};

const findPostById = async (req, res) => {
    try {
        let id = req.params.id;
        let post = await models.Post.findByPk(id);
        return res.status(200).json({
            post
        });
    }catch (e) {
        return res.status(500).send(e.message);
    }
};

const updatePost = async (req, res) => {
    try {
        let id = req.params.id;
        const update = await models.Post.update(req.body,{
            where : {
                id : id
            }
        });
        if(update) {
            let post = await models.Post.findByPk(id);
            return res.status(200).json({
                post
            });
        }
        throw new Error("Post not found");

    }catch (e) {
        return res.status(500).send(e.message);
    }
};

const deletePost = async (req, res) => {
    try {
        let id = req.params.id;
        const deletePost = await models.Post.destroy({
            where: {
                id : id
            }
        });
        if(deletePost) {
            return res.status(204).send('Delete success');
        }
        throw new Error("Post not found");
    }catch  (e) {
        return res.status(500).send(e.message);
    }
};

const createPost = async (req, res) => {
    try {
        const post = await models.Post.create(req.body);
        if(post) {
            return res.status(201).json({
                post
            })
        }
    }catch (e) {
        return res.status(500).send(e.message);
    }
};

module.exports = {
    getAllPosts,
    findPostById,
    updatePost,
    deletePost,
    createPost
};
