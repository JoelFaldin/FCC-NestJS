import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { NewPersonDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/user')
    async getUserByName(@Res() res, @Body() name: string) {
        const user = await this.userService.getByName(name);
        return user;
    }

    @Get('/user')
    getUser(@Res() res) {
        res.json({ test: test })
    }

    @Post('/create')
    async createAndSavePerson(@Res() res, @Body() newPerson: NewPersonDTO) {
        const user = await this.userService.newUser(newPerson)
        return res.status(200).json(user);
    }

}
