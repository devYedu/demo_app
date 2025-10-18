// import { Directive, ElementRef, Renderer2 } from '@angular/core';

// @Directive({
//   selector: '[appTypewriter]'
// })
// export class TypewriterDirective {
//   private queue: Array<() => Promise<void>> = [];
//   private isWriting = false;

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   /** Queue a text to be typed */
//   write(text: string, speed: number = 100, pauseAfter: number = 800,color:string, onDone?: () => void) {
//     this.queue.push(async () => {
//       await this.typeText(text, speed);
//       await this.wait(pauseAfter);
//       if (onDone) onDone();
//     });
//     this.runQueue();
//   }

//   /** Queue a generic action (for showing GIFs, etc.) */
//   action(callback: () => void, delay: number = 0) {
//     this.queue.push(async () => {
//       await this.wait(delay);
//       callback();
//     });
//     this.runQueue();
//   }

//   /** Process the queue */
//   private async runQueue() {
//     if (this.isWriting) return;
//     this.isWriting = true;

//     while (this.queue.length > 0) {
//       const task = this.queue.shift();
//       if (task) await task();
//     }

//     this.isWriting = false;
//   }

//   /** Type text letter by letter */
//   private async typeText(text: string, speed: number) {
//     this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
//     for (let i = 0; i < text.length; i++) {
//       this.renderer.setProperty(
//         this.el.nativeElement,
//         'textContent',
//         this.el.nativeElement.textContent + text.charAt(i)
//       );
//       await this.wait(speed);
//     }
//   }

//   private wait(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
// }


import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTypewriter]'
})
export class TypewriterDirective {
  private queue: Array<() => Promise<void>> = [];
  private isWriting = false;
  private defaultColor = 'black'; // fallback color

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  /** Queue a text to be typed */
  write(
    text: string,
    speed: number = 100,
    pauseAfter: number = 800,
    color?: string, // optional color
    onDone?: () => void
  ) {
    this.queue.push(async () => {
      // Apply color or default
      this.renderer.setStyle(
        this.el.nativeElement,
        'color',
        color || this.defaultColor
      );

      await this.typeText(text, speed);
      await this.wait(pauseAfter);
      if (onDone) onDone();
    });
    this.runQueue();
  }

  /** Queue a generic action (for showing GIFs, etc.) */
  action(callback: () => void, delay: number = 0) {
    this.queue.push(async () => {
      await this.wait(delay);
      callback();
    });
    this.runQueue();
  }

  /** Process the queue */
  private async runQueue() {
    if (this.isWriting) return;
    this.isWriting = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) await task();
    }

    this.isWriting = false;
  }

  /** Type text letter by letter */
  private async typeText(text: string, speed: number) {
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
    for (let i = 0; i < text.length; i++) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        this.el.nativeElement.textContent + text.charAt(i)
      );
      await this.wait(speed);
    }
  }

  private wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
