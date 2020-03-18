const Router = require("express").Router();
const PostService = require("../Services/postService");
const { NotFoundError } = require("../Utils/Error");

Router.get("/:pid", async (req, res, next) => {
  try {
    const result = await PostService.getPostDetail(req);
    if (result) {
      res.status(200).json({ success: true, response: result });
    } else {
      throw new NotFoundError("해당글이 없습니다.");
    }
  } catch (error) {
    next(error);
  }
});

Router.get("/list/:page", async (req, res, next) => {
  try {
    const result = await PostService.getPostList(req);
    if (result) {
      res.status(200).json({ success: true, response: result });
    } else {
      throw new NotFoundError("가져올 글이 없습니다.");
    }
  } catch (error) {
    next(error);
  }
});

Router.post("/", async (req, res, next) => {
  try {
    const result = await PostService.createPost(req);
    result &&
      res.status(201).json({
        success: true,
        response: {
          id: result.dataValues.id
        }
      });
  } catch (error) {
    next(error);
  }
});

Router.patch("/", async (req, res, next) => {
  try {
    const result = await PostService.updatePost(req);
    result &&
      res.status(201).json({
        success: true
      });
  } catch (error) {
    next(error);
  }
});

Router.delete("/", async (req, res, next) => {
  try {
    const result = await PostService.deletePost(req);
    if (result) {
      res.status(200).json({
        success: true
      });
    } else {
      res.status(404).json({
        success: false
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = Router;