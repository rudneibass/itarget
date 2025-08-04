import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterController } from './user.register.controller';

describe('UserController', () => {
  let userRegisterController: UserRegisterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserRegisterController],
      providers: [],
    }).compile();

    userRegisterController = app.get<UserRegisterController>(UserRegisterController);
  });

  describe('root', () => {
    it('should return "Register user controller!"', () => {
      expect(userRegisterController.handle()).toBe('Register user controller!');
    });
  });
});
