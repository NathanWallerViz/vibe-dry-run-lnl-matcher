// Minimal stubs for Angular to satisfy TypeScript compiler without installing packages.
declare module '@angular/core' {
  export function Component(options: any): ClassDecorator;
  export function NgModule(options: any): ClassDecorator;
  export function Injectable(options?: any): ClassDecorator;
  export interface OnInit {}
}

declare module '@angular/platform-browser' {
  export class BrowserModule {}
}

declare module '@angular/forms' {
  export class FormsModule {}
}

declare module '@angular/router' {
  export class Router {
    navigate(commands: any[]): void;
  }
  export class RouterModule {
    static forRoot(routes: any[]): any;
  }
  export type Routes = any[];
}

declare module '@angular/platform-browser-dynamic' {
  export function platformBrowserDynamic(): {
    bootstrapModule(module: any): Promise<any>;
  };
}

declare module 'tslib' {
  export function __decorate(decorators: any, target: any, key?: any, desc?: any): any;
  export function __metadata(metadataKey: any, metadataValue: any): any;
}

declare module '@angular/core/testing' {
  export const TestBed: any;
}

declare module '@angular/router/testing' {
  export const RouterTestingModule: any;
}
