import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CashService } from './cash.service';
import { NgxsModule } from '@ngxs/store';
import { CashState } from './store/state/cash.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsResetPluginModule } from '@simfyz/ngxs-reset-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([CashState]),
    NgxsResetPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ keys: '*' }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [CashService],
  bootstrap: [AppComponent],
})
export class AppModule {}
