import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUsersController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsControllers";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendCompliments = new ListUserSendComplimentsController();
const listUserReceiveCompliments = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();

router.post("/users", createUserController.handle);

router.post(
    "/tags",
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);

router.post("/login", authenticateUserController.handle);

router.post(
    "/compliments",
    ensureAuthenticated,
    createComplimentController.handle
);

router.get(
    "/user/compliments/receive",
    ensureAuthenticated,
    listUserReceiveCompliments.handle
);

router.get(
    "/user/compliments/send",
    ensureAuthenticated,
    listUserSendCompliments.handle
);

router.get(
    "/tags",
    ensureAuthenticated,
    listTagsController.handle
);

export { router };