import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertConfig, CustomAlertComponent } from './alert.component';

describe('CustomAlertComponent', () => {
  let fixture: ComponentFixture<CustomAlertComponent>;
  let component: CustomAlertComponent;

  function create(config: AlertConfig): void {
    fixture = TestBed.createComponent(CustomAlertComponent);
    component = fixture.componentInstance;
    component.config = config;
    fixture.detectChanges();
  }

  beforeEach(() => TestBed.configureTestingModule({ imports: [CustomAlertComponent] }));

  it('shows the title and message of its config', fakeAsync(() => {
    create({ type: 'info', title: 'Heads up', message: 'Saved correctly' });
    tick(10);
    fixture.detectChanges();

    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Heads up');
    expect(text).toContain('Saved correctly');
  }));

  it('emits true and then closes when the user confirms', fakeAsync(() => {
    create({ type: 'confirm', title: 'Delete', message: 'Sure?' });
    const confirmed: boolean[] = [];
    let closed = false;
    component.confirmed.subscribe((value) => confirmed.push(value));
    component.closed.subscribe(() => (closed = true));

    component.confirm();
    expect(confirmed).toEqual([true]);
    expect(closed).toBeFalse();

    tick(200);
    expect(closed).toBeTrue();
  }));

  it('emits false when a confirmation is cancelled', fakeAsync(() => {
    create({ type: 'confirm', title: 'Delete', message: 'Sure?' });
    const confirmed: boolean[] = [];
    component.confirmed.subscribe((value) => confirmed.push(value));

    component.cancel();
    tick(200);

    expect(confirmed).toEqual([false]);
  }));

  it('emits false through promptResult when a prompt is cancelled', fakeAsync(() => {
    create({ type: 'prompt', title: 'Name', message: 'Your name' });
    const results: Array<string | null | false> = [];
    component.promptResult.subscribe((value) => results.push(value));

    component.cancel();
    tick(200);

    expect(results).toEqual([false]);
  }));

  it('closes by itself after its duration', fakeAsync(() => {
    create({ type: 'success', title: 'Done', message: 'ok', duration: 1000 });
    let closed = false;
    component.closed.subscribe(() => (closed = true));

    tick(1000 + 200);

    expect(closed).toBeTrue();
  }));
});
