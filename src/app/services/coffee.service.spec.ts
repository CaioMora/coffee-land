import { TestBed } from '@angular/core/testing';
import { CoffeeService } from './coffee.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoffeeService', () => {
  let service: CoffeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoffeeService]
    });

    service = TestBed.inject(CoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});