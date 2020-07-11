import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
} from '@angular/core';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { interval, Subscription } from 'rxjs';
import { RecordService } from '../../services/recorder.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css'],
})
export class RecorderComponent implements OnInit, OnDestroy {
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas')
  public canvas: ElementRef;
  public model = {};
  captures = [];
  timeInterval: Subscription;
  private busy = false;

  constructor(
    private renderer: Renderer2,
    private recordServide: RecordService
  ) {}
  ngOnInit(): void {}

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
    this.renderer.listen(this.video.nativeElement, 'play', (event) => {
      this.loadModel();
    });
  }

  capture() {
    this.timeInterval = interval(1000).subscribe(async () => {
      if (!this.busy) {
        const predictions = await this.model['current'].detect(
          this.video.nativeElement
        );
        predictions.forEach((p) => {
          if (p.class === 'person' && p.score >= 0.8) {
            var context = this.canvas.nativeElement
              .getContext('2d')
              .drawImage(this.video.nativeElement, 0, 0, 640, 480);
            this.captures.push(
              this.canvas.nativeElement.toDataURL('image/png')
            );
            this.sendImageToBackend(this.captures[this.captures.length - 1]);
            console.log('--------', predictions);
          }
        });
      }
    });
  }

  async loadModel() {
    cocoSsd.load().then((model) => {
      this.model['current'] = model;
      this.capture();
    });
  }

  stop() {
    if (this.timeInterval) {
      this.timeInterval.unsubscribe();
    }
  }

  sendImageToBackend(image) {
    console.log('sending image to back...........', image);
    this.busy = true;
    this.recordServide.sendImageToBacked(image).subscribe((res) => {
      this.busy = false;
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
