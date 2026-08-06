import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '@domain/index';
import { AppointmentRepository } from './appointment.repository.interface';

@Injectable({
  providedIn: 'root'
})
export class GetAppointmentsByDateRangeUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  execute(startDate: Date, endDate: Date): Observable<Appointment[]> {
    return this.appointmentRepository.getAppointmentsByDateRange(startDate,endDate);
  }
}
