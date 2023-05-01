export class PersonRouter {
  constructor(router, personController, token) {
    this.router = router;
    this.personController = personController;
    this.token = token;
    this.routes();
  }

  routes() {
    this.router.get(
      "/pessoa",
      this.token.check,
      this.personController.getController
    );

    this.router.get(
      "/pessoa/:id",
      this.token.check,
      this.personController.getOneController
    );

    this.router.post(
      "/pessoa",
      this.token.check,
      this.personController.postController
    );

    this.router.patch(
      "/pessoa/:id",
      this.token.check,
      this.personController.updateController
    );

    this.router.delete(
      "/pessoa/:id",
      this.token.check,
      this.personController.deleteController
    );
  }

  start() {
    return this.router;
  }
}
