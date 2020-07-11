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

declare var resemble;

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
    this.timeInterval = interval(1500).subscribe(async () => {
      if (!this.busy) {
        const predictions = await this.model['current'].detect(
          this.video.nativeElement
        );
        predictions.forEach((p) => {
          if (p.class === 'person' && p.score >= 0.8) {
            this.canvas.nativeElement
              .getContext('2d')
              .drawImage(this.video.nativeElement, 0, 0, 640, 480);
            this.compareImages(
              this.canvas.nativeElement.toDataURL('image/png')
            );
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

  restart() {
    this.capture();
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

  compareImages(imageToCompare) {
    if (this.captures.length) {
      resemble(this.captures[0])
        .compareTo(imageToCompare)
        .onComplete((data) => {
          console.log('---------comparison data----------', data);
          if (data.rawMisMatchPercentage >= 65) {
            this.captures[0] = imageToCompare;
            this.sendImageToBackend(imageToCompare);
          }
        });
    } else {
      this.captures.push(imageToCompare);
      this.sendImageToBackend(imageToCompare);
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
