import { UserService } from "../user/user.service";


export class AuthController {
   
  constructor(private userService: UserService) {}

 async register(req: Request, res: Response) {
    // const { email, password } = req.body;
    // const user = await this.userService.create({ email, password });
    // res.status(201).json(user);
  }
}