export class AnnotationRouter {
  constructor(router, annotationController, token) {
    this.router = router;
    this.annotationController = annotationController;
    this.token = token;
    this.routes();
  }

  routes() {
    this.router.get(
      "/anotacao",
      this.token.check,
      this.annotationController.getController
    );
    this.router.get(
      "/anotacao/:id",
      this.token.check,
      this.annotationController.getOneController
    );
    this.router.post(
      "/anotacao",
      this.token.check,
      this.annotationController.postController
    );
    this.router.delete(
      "/anotacao/:id",
      this.token.check,
      this.annotationController.deleteController
    );
    this.router.patch(
      "/anotacao/:id",
      this.token.check,
      this.annotationController.updateController
    );
  }

  start() {
    return this.router;
  }
}

export default AnnotationRouter;
