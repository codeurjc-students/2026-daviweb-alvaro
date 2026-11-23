import { firstValueFrom } from 'rxjs';
import { Service } from '@domain/services';
import { CreateServiceUseCase } from './create-service.use-case';
import { ServiceRepository } from './service.repository.interface';

describe('CreateServiceUseCase', () => {
  let repository: jasmine.SpyObj<ServiceRepository>;
  let useCase: CreateServiceUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<ServiceRepository>('ServiceRepository', ['addService']);
    useCase = new CreateServiceUseCase(repository);
  });

  it('saves the service through the repository and emits the new id', async () => {
    const service = new Service('Haircut', 'Classic haircut');
    repository.addService.and.resolveTo('service-1');

    const id = await firstValueFrom(useCase.execute(service));

    expect(repository.addService).toHaveBeenCalledOnceWith(service);
    expect(id).toBe('service-1');
  });

  it('propagates repository failures as an observable error', async () => {
    repository.addService.and.rejectWith(new Error('storage down'));

    await expectAsync(firstValueFrom(useCase.execute(new Service('Beard', 'Trim')))).toBeRejectedWithError('storage down');
  });
});
