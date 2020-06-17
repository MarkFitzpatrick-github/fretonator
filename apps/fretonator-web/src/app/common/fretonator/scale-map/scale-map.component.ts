import { Component, Input } from '@angular/core';
import { Mode, ModeMap } from '../../../util/types';
import { NotePlaybackService } from '../../playback/note-playback.service';

enum ScaleDegreesToggleText {
  hidden = 'What is this?',
  visible = 'Hide info'
}

enum TheoreticalScalesToggleText {
  hidden = 'About theoretical scales',
  visible = 'Hide info'
}

@Component({
  selector: 'app-scale-map',
  templateUrl: './scale-map.component.html',
  styleUrls: ['./scale-map.component.scss']
})
export class ScaleMapComponent {
  @Input() mode: Mode;
  @Input() note: string;
  @Input() noteExtenderString: string;
  @Input() modeMap: ModeMap;
  @Input() isTheoretical: boolean;
  @Input() modeDisplayString: string;

  showScaleMapInfo = false;
  showTheoreticalScalesInfo = false;
  scaleDegreesToggleText = ScaleDegreesToggleText.hidden;
  theoreticalScalesToggleText = TheoreticalScalesToggleText.hidden;

  constructor(public playbackService: NotePlaybackService) {
  }

  toggleScaleMapInfo() {
    this.showScaleMapInfo = !this.showScaleMapInfo;
    this.scaleDegreesToggleText = this.showScaleMapInfo ? ScaleDegreesToggleText.visible : ScaleDegreesToggleText.hidden;
  }

  toggleTheoreticalScaleInfo() {
    this.showTheoreticalScalesInfo = !this.showTheoreticalScalesInfo;
    this.theoreticalScalesToggleText = this.showTheoreticalScalesInfo ? TheoreticalScalesToggleText.visible : TheoreticalScalesToggleText.hidden;
  }

  playScale(modeMap: ModeMap) {
    this.playbackService.playMode(modeMap);
  }
}
