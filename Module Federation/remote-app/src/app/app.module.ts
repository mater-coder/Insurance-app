import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InsuranceDetailsService } from 'src/service/insurance-details.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterModule } from './counter/counter.module';
import { Compiler } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// const sharedKey = process.env['SHARED_KEY'];
@NgModule({
  declarations: [
    AppComponent,
    // ButtonComponent
  ],
  imports: [
    BrowserModule,
    CounterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // async () => (await import(`shared/${sharedKey}`)).SharedModule
  ],
  providers: [InsuranceDetailsService],
  bootstrap: [AppComponent]
})

export class AppModule {

 /*  constructor(private injector: Injector, private compiler: Compiler) {}

ngDoBootstrap() {
  (async () => {
    const sharedKey = process.env['SHARED_KEY']; // Read shared key from environment

    // Dynamically import the entire shell application (not recommended)
    // const shellModule = (await import(`http://localhost:4200/remoteEntry.js`)).RemoteEntryModule;

    // **OR** Dynamically import only the shared module (recommended)
    const shellModule = (await import(`shared/${sharedKey}`)).SharedModule;

    // Only apply `compiler.compileModuleAsync` if necessary
    // (e.g., if the shell module wasn't compiled in the shell)
    await this.compiler.compileModuleAsync(shellModule);

    // Find the ButtonComponent factory from the imported module
    const buttonComponentFactory = shellModule.componentFactories.find((f: { componentType: any; }) => f.componentType === buttonComponentRef);

    if (!buttonComponentFactory) {
      throw new Error('ButtonComponent not found in imported module');
    }

    // Create the component instance
    const buttonComponentRef = buttonComponentFactory.create(this.injector);

    // Now you have access to the ButtonComponent instance via buttonComponentRef

    // ... use buttonComponentRef
    if (buttonComponentRef) {
      console.log('Button component created successfully!');
      // You can also access properties and methods of the component here
    } else {
      console.error('Failed to create button component.');
    }
  })();
} */

  
 }
