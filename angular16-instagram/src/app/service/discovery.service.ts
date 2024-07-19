import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  private eurekaUrl = 'http://10.0.0.63:8761/eureka/apps'; // Replace with your Eureka server URL

  constructor(private http: HttpClient) {}

  getServiceUrl(serviceName: string): Observable<string> {
    return this.http.get<any>(this.eurekaUrl).pipe(
      map(response => {
        const applications = response.applications.application;
        return applications.map((app: any) => ({
          name: app.name,
          instances: app.instance.map((instance: any) => ({
            instanceId: instance.instanceId,
            homePageUrl: instance.homePageUrl,
            status: instance.status,
          }))
        }));
      })
    );
  }
}
