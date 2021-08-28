import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { BattleComponent } from './components/battle/battle.component';
import { BattleCardComponent } from './components/battle-card/battle-card.component';

@NgModule({
  declarations: [AppComponent, ChatComponent, BattleComponent, BattleCardComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
