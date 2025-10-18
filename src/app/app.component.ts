import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimeZones } from './format';
import { delay, Subscription, switchMap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TypewriterDirective } from './typewriter.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeSwitch', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('700ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('800ms ease-in-out')),
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  // parts
  enablePart1 = false;
  enablePart2 = false;
  enablePart3 = false;
  enablePart4 = false;
  enablePart5 = false;
  enableLast = false;
  // hints
  enableK = false;
  enableO = false;
  enableC = false;
  enableH = false;
  // gifs
  // showThinkingGif = false;
  interactionMsg = '';
  // inputs
  showNameInput = false;
  inputName = ''
  checkValidNameCounter = 0;
  TextKoch = ['K', 'O', 'C', 'H'];
  enableHints = false;
  enableQuizSection = false;
  gifsCounter = 0;
  // quiz
  currentQuestionNumber = 1;
  currentQuestion = '';
  rightCount = 0;
  question = '';
  currentOptions: string[] = [];
  questions = [
    {
      q: "Our First Tea Spot",
      options: ["Cusat canteen", "chaya kada", "cusatinte canteen", "Tea spot"],
      answer: ""
    },
    {
      q: "Our First meet date",
      options: ["may 24", "march 28", "may 21", "may 23"],
      answer: ""
    },
    {
      q: "How many Kilometers ,we had travelled together in bike",
      options: ["67", "78", "87", "58"],
      answer: ""
    },
    {
      q: "Total no of Teas we had together",
      options: ["8", "10", "7", "9"],
      answer: ""
    },
    {
      q: "How many sorrys we said to each other",
      options: ["178", "180", "130", "165"],
      answer: ""
    }
  ]

  // slideshow
  audio = new Audio('assets/song.mp3');
  audioStarted = false;
  showSongSection = false;
  showSongBtns = false;
  imageList = [
    { src: 'assets/bio_tech.jpg', caption: 'The First Day 🌸' },
    { src: 'assets/tea_day.jpg', caption: 'Miss U & those ☕s ' },
    { src: 'assets/tea_day_2.jpg', caption: 'with shutttumaniii ❤️' },
    { src: 'assets/selfie_last_day.jpg', caption: 'that break down was unexpected!' },
  ];
  currentImageIndex = 0;
  slideshowFinished1 = false;

  imageList2 = [
    { src: 'assets/scribble.jpg', caption: 'ith orkunnundo kochee?? ', duration: 4000 },
    { src: 'assets/poison.jpg', caption: 'ithh???', duration: 3000 },
    { src: 'assets/pepelo_1.jpg', caption: 'ee game ????', duration: 3000 },
    { src: 'assets/pepelo_2.jpg', caption: '', duration: 3000 },
    { src: 'assets/song_ss.jpg', caption: 'you made me go on repeat for this song ❤️', duration: 4000 }
  ];
  currentImageIndex2 = 0;
  slideshowFinished2 = false;

  yesCounter = 0;
  noCounter = 0;

  selectedOption: string | null = null;
  isCorrect: boolean | null = null;
  @ViewChildren(TypewriterDirective) typewriters!: QueryList<TypewriterDirective>;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    // this.enablePart1 = true;
    // this.loadPart2();
  }
  ngOnInit(): void {
    // 1. Part -1 load app
    this.enablePart1 = true;
    // // 2. Part-2 Name and validity 
    this.loadPart2();

    // dev
    // this.enablePart3 = true;
    // this.loadPart3();
    // this.setFirstQuestion();

    // this.loadPart4();
    // this.loadSongSection();
    // this.loadPart5();


  }

  loadPart2() {
    setTimeout(() => {
      this.enablePart1 = false;
      this.enablePart2 = true;
      const part2Typewriter = this.typewriters.toArray()[0]; // first <h1>

      // 🪄 Typewriter sequence
      part2Typewriter.write('Hi....', 150, 1000);
      part2Typewriter.write('hmmm...aara???', 150, 1000);

      // 🎬 Trigger GIF with a smooth fade
      // this.typewriter.action(() => this.showThinkingGif = true, 200);

      part2Typewriter.write('Enk Orma Kittanilla....', 100, 1500);
      part2Typewriter.write("Kuttyde perentha....", 100, 2000);

      part2Typewriter.action(() => this.showNameInput = true, 300);


    }, 2500);
  }
  // quiz
  loadPart3() {
    this.enablePart2 = false;
    this.enablePart3 = true;
    setTimeout(() => {
      const part3Typewriter = this.typewriters.toArray()[1]; // second <h1>
      part3Typewriter.write('ok kuttuu..', 50, 1000);
      part3Typewriter.write('I know , U know ', 100, 1000);
      part3Typewriter.write('Its ur special Day! ❤️', 100, 1000);
      part3Typewriter.write('nmk oru game kalikkaam !!!', 100, 1000);
      part3Typewriter.write('5 Questions only.. ', 100, 1000);
      part3Typewriter.write('Ente kochinu ethra mark kittuvenn nokkatte', 70, 2000);
      part3Typewriter.write('', 0, 1000);
      setTimeout(() => {
        this.gifsCounter = 1;
        this.enableQuizSection = true;
        this.setFirstQuestion();
      }, 22000);

    }, 1000);
  }
  setFirstQuestion() {
    this.currentQuestion = this.questions[0].q;
    this.currentOptions = this.questions[0].options;
  }
  onOptionClick(option: string, currrentQuestion: number) {
    if (this.currentQuestionNumber < 6) {
      this.selectedOption = option;
      this.isCorrect = (this.selectedOption === this.questions[currrentQuestion].answer);
      // Optional: reset after 1.5s
      setTimeout(() => {
        this.selectedOption = null;
        this.isCorrect = null;
        this.currentQuestionNumber++;
        if (this.currentQuestionNumber <= 5) {
          this.setNextQuestion(currrentQuestion + 1);
          this.gifsCounter++;
        } else {
          // questions over
          this.enableQuizSection = false;
          const part3Typewriter = this.typewriters.toArray()[1]; // second <h1>
          setTimeout(() => {
            part3Typewriter.write('0 ???', 50, 1000);
            this.gifsCounter = 6;
            part3Typewriter.write('chumma pattichathaa 😜???', 50, 1000);
            part3Typewriter.write('let it be 5/5..', 50, 1000);
            part3Typewriter.write('4/5..', 50, 1000);
            part3Typewriter.write('3/5..', 50, 1000);
            this.gifsCounter = 7;
            part3Typewriter.write('whatever.. Your my kuttu ❤️', 50, 1000);
            setTimeout(() => {
              this.loadSongSection();
              // this.loadPart4();
            }, 12000);
          }, 1000);
        }
      }, 1000);
    }
  }
  loadSongSection() {
    this.enablePart3=false;
    this.showSongSection = true;
    this.cdr.detectChanges(); // ensure latest DOM
    const typewriters = this.typewriters.toArray();
    const songTypeWriter = typewriters[typewriters.length - 1]; // last one = part4 h1
    if (songTypeWriter) {
      songTypeWriter.write('will show you something.. ❤️', 50, 1000);
      setTimeout(() => {
        songTypeWriter.write('U want to see?', 50, 1000);
        setTimeout(() => {
          this.showSongBtns = true;
        }, 2000);
      }, 2000);
    }
  }
  onclickYes() {
    this.yesCounter++;
    switch (this.yesCounter) {
      case 1:
        this.YES_1();
        break;
      case 2:
        this.YES_2();
        break;
      case 3:
        this.YES_3();
        break;
      case 4:
        this.YES_4();
        break;
      case 5:
        this.YES_5();
        break;
    }
    // this.startExperience()
  }
  YES() {
    this.cdr.detectChanges(); // ensure latest DOM
    const typewriters = this.typewriters.toArray();
    return typewriters[typewriters.length - 1]; // last one = part4 h1
  }
  YES_1() {
    const songTypeWriter = this.YES();
    if (songTypeWriter) {
      this.showSongBtns = false;
      songTypeWriter.write('sherikkum ?', 50, 1000);
      setTimeout(() => {
        this.showSongBtns = true;
      }, 1000);
    }
  }
  YES_2() {
    const songTypeWriter = this.YES();
    if (songTypeWriter) {
      this.showSongBtns = false;
      songTypeWriter.write('onnude aalojiche ?', 50, 1000);
      setTimeout(() => {
        this.showSongBtns = true;
      }, 1500);
    }
  }
  YES_3() {
    const songTypeWriter = this.YES();
    if (songTypeWriter) {
      this.showSongBtns = false;
      songTypeWriter.write('Urappaano ?', 50, 1000);
      setTimeout(() => {
        this.showSongBtns = true;
      }, 1000);
    }
  }
  YES_4() {
    const songTypeWriter = this.YES();
    if (songTypeWriter) {
      this.showSongBtns = false;
      songTypeWriter.write('aanallo allee 😁😁 ?', 50, 1000);
      setTimeout(() => {
        this.showSongBtns = true;
      }, 1500);
    }
  }
  YES_5() {
    const songTypeWriter = this.YES();
    if (songTypeWriter) {
      this.showSongBtns = false;
      songTypeWriter.write('vaa kanikkaam ?', 50, 1000);
      setTimeout(() => {
        this.showSongSection = false;
        this.startExperience();
      }, 2000);
    }
  }
  onclickNo() {
    const songTypeWriter = this.YES();
    if (songTypeWriter) {
      this.showSongBtns = false;
      songTypeWriter.write('angane parayaruth..kanano? ?', 50, 1000);
      setTimeout(() => {
        this.showSongBtns = true;
      }, 1500);
    }
  }
  async startExperience() {
    this.audioStarted = true;
    await this.audio.play(); // initial unlock
    this.audio.pause();
    this.audio.currentTime = 0;

    // now that browser allows it, start the full flow
    this.loadPart4(); // or whichever part starts the show
  }

  loadPart4() {
    this.enablePart4 = true;
    // Let Angular render part-4 first
    setTimeout(() => {
      this.cdr.detectChanges(); // ensure latest DOM
      const typewriters = this.typewriters.toArray();
      const part4Typewriter = typewriters[typewriters.length - 1]; // last one = part4 h1
      if (part4Typewriter) {
        this.startSlideshow1();
        // this.
        this.startSlideshow2();
        // this.loadPart5();

        // setTimeout(() => {
        //   setInterval(() => {
        //     this.currentImageIndex = (this.currentImageIndex + 1) % this.imageList.length;
        //   }, 4000); // change every 2 seconds
        // }, 2000);

      } else {
        console.warn('Part-4 typewriter not found yet');
      }
    }, 300); // small delay
  }
  // 🎬 Slideshow 1 (starts music and first image set)
  async startSlideshow1() {
    try {
      // Start audio with fade-in
      this.audio.currentTime = 0;
      this.audio.loop = false; // disable looping
      await this.fadeInAudio(1, 0.1, 200);

      // Wait a little before showing first image
      await new Promise(res => setTimeout(res, 300));

      for (let i = 0; i < this.imageList.length; i++) {
        this.currentImageIndex = i;
        // Each image stays for 3s + 800ms fade animation
        await new Promise(res => setTimeout(res, 3000 + 800));
      }

      this.slideshowFinished1 = true;
    } catch (err) {
      console.error('Error starting slideshow1:', err);
    }
  }

  // 🎞️ Slideshow 2 (waits for slideshow1, ends audio)
  async startSlideshow2() {
    try {
      // Wait until slideshow 1 is done
      await new Promise(res => {
        const check = setInterval(() => {
          if (this.slideshowFinished1) {
            clearInterval(check);
            res(true);
          }
        }, 200);
      });

      // Small delay before starting 2nd slideshow
      await new Promise(res => setTimeout(res, 500));

      for (let i = 0; i < this.imageList2.length; i++) {
        this.currentImageIndex2 = i;
        const current = this.imageList2[i];
        // duration + fade buffer
        await new Promise(res => setTimeout(res, current.duration + 800));
      }

      this.slideshowFinished2 = true;
      this.loadPart5();

      // Fade out music when both slideshows complete
      this.fadeOutAudio(0.1, 200);
    } catch (err) {
      console.error('Error in slideshow2:', err);
    }
  }
  loadPart5() {
    this.enablePart5 = true;
    this.enablePart4 = false;
    this.cdr.detectChanges(); // ensure latest DOM
    const typewriters = this.typewriters.toArray();
    console.log(typewriters);

    const writer5 = typewriters[typewriters.length - 1]; // last one = part4 h1
    if (writer5) {
      writer5.write('ok kuttuu...', 100, 1000);
      setTimeout(() => {
        writer5.write('I know', 100, 1000);
        writer5.write('Its ur special day', 100, 1000);
        writer5.write('enik avde undavanum pattiyilla', 100, 1000);
        writer5.write('sorry and hugss....🫂🫂', 100, 1000);
        writer5.write('evdanelum..eppozhanelum...', 100, 1000);
        writer5.write('koch ente koch thanneya ❤️🫂', 100, 1000);
        setTimeout(() => {
          this.enablePart5 = false;
          this.enableLast = true;;

          this.typewriters.changes.subscribe((list: QueryList<any>) => {
            const writer6 = list.last;
            if (writer6) {
              writer6.write("Happiest B'day Dear ❤️", 100, 1000, 'white');
              writer6.write("Be Happy , Be You , Be Special ❤️", 100, 1000, 'white');
              writer6.write("with love...", 100, 1000, 'white');
              writer6.write("onnude...", 100, 1000, 'white');
              writer6.write("Happy birthday koche ❤️", 100, 1000, 'white');

            }
          });
        }, 22000);
      }, 1000);
    }

  }


  setNextQuestion(questionNo: number) {
    this.currentQuestion = this.questions[questionNo].q;
    this.currentOptions = this.questions[questionNo].options;
  }
  onNameSubmit() {
    if (this.inputName !== '' && this.inputName.length > 0) {
      const name = this.inputName;
      this.checkValidName(name);
    }
  }
  checkValidName(name: string) {
    const part2Typewriter = this.typewriters.toArray()[0]; // first <h1>
    this.checkValidNameCounter = this.checkValidNameCounter + 1;
    if (name === "koch") {
      part2Typewriter.write('ahm...ippo okey ❤️', 100, 1000);
      part2Typewriter.write('❤️🫂', 100, 1000);
      this.checkValidNameCounter = 20;
      this.enableHints = false;
      this.showNameInput = false;
      setTimeout(() => {
        this.loadPart3();
      }, 2000);
    } else {
      switch (this.checkValidNameCounter) {
        case 1:
          part2Typewriter.write('athaara !??', 150, 1000);
          break;
        case 2:
          part2Typewriter.write('ehh.. aara?', 150, 1000);

          break;
        case 3:
          part2Typewriter.write('athallalloo peru..onnude alojikku?', 100, 1000);
          break;
        case 4:
          part2Typewriter.write('No..Njan entha vilikkaru??', 100, 1000);
          break;
        default:
          part2Typewriter.write('No..try ..again', 100, 1000);
          if (this.checkValidNameCounter === 5) {
            this.enableHints = true;
            this.enableK = true;
            part2Typewriter.write('starts with "K"', 100, 1000);
          } else if (this.checkValidNameCounter === 6) {
            this.enableH = true;
            part2Typewriter.write('starts with "H"', 100, 1000);
          }
          else if (this.checkValidNameCounter === 7) {
            this.enableO = true;
          }
          else if (this.checkValidNameCounter === 8) {
            this.enableC = true;
          }

      }
    }
  }
  // 🔊 Optional: smoother fade control helpers
  async fadeInAudio(targetVolume = 0.15, step = 0.02, interval = 200) {
    // targetVolume reduced from 1 → 0.15 for a softer volume
    this.audio.volume = 0;
    this.audio.play();
    while (this.audio.volume < targetVolume) {
      this.audio.volume = Math.min(this.audio.volume + step, targetVolume);
      await new Promise(res => setTimeout(res, interval));
    }
  }

  fadeOutAudio(step = 0.02, interval = 200) {
    // step reduced slightly for a smoother fade out
    const fadeInterval = setInterval(() => {
      if (this.audio.volume > step) {
        this.audio.volume -= step;
      } else {
        this.audio.volume = 0;
        this.audio.pause();
        clearInterval(fadeInterval);
      }
    }, interval);
  }

}
