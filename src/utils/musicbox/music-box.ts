import type { MusicNote, MusicSheet } from './music-sheet';

export class MusicBox {

  private noteIndex: number = 0;
  private loopCounter: number = 0;

  public constructor(
    private readonly sheet: MusicSheet,
  ) { }

  /*
   * Play the music sheet
   * @param type OscillatorType
   * @returns boolean true if the music sheet is finished
   */
  public play(type: OscillatorType): boolean {
    const audioContext: AudioContext = new AudioContext();
    const oscillator: OscillatorNode = audioContext.createOscillator();
    const gainNode: GainNode = audioContext.createGain();
    const destination: AudioDestinationNode = audioContext.destination;
    const note: MusicNote = this.currentNote();
    gainNode.connect(destination);
    oscillator.connect(gainNode);
    oscillator.type = 'sine';
    const audioParam: AudioParam = oscillator.frequency
    audioParam.value = note.frequency;
    oscillator.start(0);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + note.duration);    
    return this.loopCounter > 0;
  }

  private currentNote(): MusicNote {
    const sheet: MusicNote[] = this.sheet.sheets;
    const musicNote: MusicNote = sheet[this.noteIndex++];
    if (this.noteIndex >= sheet.length)
      this.loopCounter++;
    if (musicNote)
      return musicNote;
    this.noteIndex = 0;
    return this.currentNote();
  }
  
}