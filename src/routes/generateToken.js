
export class TokenRouter{
    constructor(router, token ) {
        this.router = router;
        this.token = token;
        this.routes();
    }

    routes(){
      this.router.get('/token/:name', async (req, res) => {

         const {name} = req.params;
      
         if(name === "" || name === undefined){
            res.status(401).json("Unauthorized, send a name")
         }
      
         const response = await this.token.create({'name': name})
      
         res.status(200).json({token: response})
      });
    }

    start(){
        return this.router;
    }
}