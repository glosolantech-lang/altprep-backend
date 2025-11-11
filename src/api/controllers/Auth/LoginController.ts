import { JsonController, Body, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { LoginRequest } from '@api/requests/Auth/LoginRequest';
import { LoginService } from '@api/services/Auth/LoginService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@JsonController('/auth')
export class LoginController extends ControllerBase {
  public constructor(private loginService: LoginService) {
    super();
  }

  @Post('/login')
  public async login(@Body() user: LoginRequest) {
    try {
      const authorization = await this.loginService.login(user);
      return {
        status: true,
        message: 'Login successful',
        data: authorization,
      }
    } catch (error) {
      throw error;
    }
  }
}
