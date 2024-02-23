
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-microfrontendhost',
  templateUrl: './microfrontendhost.component.html',
  styleUrls: ['./microfrontendhost.component.scss']
})
export class MicrofrontendhostComponent implements OnInit {

  @ViewChild('microfrontendAContainer', { read: ViewContainerRef }) microfrontendAContainer!: ViewContainerRef;
  @ViewChild('microfrontendBContainer', { read: ViewContainerRef }) microfrontendBContainer!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadMicrofrontend('http://localhost:4201/remoteEntry.js', 'remoteApp', './CounterModule', this.microfrontendAContainer);
    this.loadMicrofrontend('http://localhost:4202/remoteEntry.js', 'remoteApp2', './MicrofrontendModule', this.microfrontendBContainer);
  }

  private loadMicrofrontend(remoteEntry: string, remoteName: string, exposedModule: string, container: ViewContainerRef) {
    loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule,
    })
      .then((m) => {
        const factory = this.componentFactoryResolver.resolveComponentFactory(m[exposedModule]);
        container.createComponent(factory);
      })
      
  }

}
