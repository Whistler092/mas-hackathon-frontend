import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecorderComponent } from './components/recorder/recorder.component';

@NgModule({
  declarations: [RecorderComponent],
  imports: [CommonModule, RecorderComponent],
})
export class DetectorModule {}
