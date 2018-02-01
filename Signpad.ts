class Signpad {
  TheCanvas: HTMLCanvasElement;

  Drawing: boolean = false;

  lastx: number = -1;
  lasty: number = -1;

  linecolor: string = "#000000";
  backcolor: string = "#C0C0C0";

  constructor(element: HTMLCanvasElement) {
    this.TheCanvas = element;
    //this.TheDiv = container;

    // Register an event listener to
    // call the resizeCanvas() function each time
    // the window is resized.
    window.addEventListener("resize", this.resizeCanvas, false);

    this.TheCanvas.addEventListener("mousemove", this.HandleMouseMove);

    this.TheCanvas.addEventListener("mousedown", this.HandleMouseDown);

    this.TheCanvas.addEventListener("mouseup", this.HandleMouseUp);

    this.TheCanvas.addEventListener("touchstart", this.HandleTouchStart);

    this.TheCanvas.addEventListener("touchend", this.HandleTouchEnd);

    this.TheCanvas.addEventListener("touchmove", this.HandleTouchMove);
  };

  resize() {
    // Lookup the size the browser is displaying the canvas.
    // Make it visually fill the positioned parent

    this.TheCanvas.style.width = "100%";
    // canvas.style.height = '100%';
    // ...then set the internal size to match
    this.TheCanvas.width = this.TheCanvas.offsetWidth;
    this.TheCanvas.height = this.TheCanvas.offsetHeight;
  };

  resizeCanvas = (ev: UIEvent) => {
    this.resize;
    this.FillCanvas();
  };

  SetBackgroundColor(col: string) {
    this.backcolor = col;
    this.FillCanvas();
  };

  SetDrawColor(col: string) {
    this.linecolor = col;
    this.FillCanvas();
  };

  FillCanvas() {
    this.resize();
    this.ClearCanvas();
    // this.RedrawCanvas();
  };

  private ClearCanvas() {
    var ctx = this.TheCanvas.getContext("2d");
    ctx.fillStyle = this.backcolor;
    ctx.fillRect(0, 0, this.TheCanvas.width, this.TheCanvas.height);
    this.Drawing = false;
    this.lastx = -1;
    this.lasty = -1;
  };

  HandleTouchStart = (ev: TouchEvent) => {
    this.Drawing = true;
    this.lastx = ev.touches[0].clientX;
    this.lasty = ev.touches[0].clientY;

    ev.preventDefault();  // Eat the touch if its on the canvas 
  };

  HandleTouchEnd = (ev: TouchEvent) => {
    this.Drawing = false;
    this.lastx = -1;
    this.lasty = -1;

    ev.preventDefault(); // Eat the touch if its on the canvas
  };

  HandleTouchMove = (ev: TouchEvent) => {
    if (this.Drawing) {
      var ctx = this.TheCanvas.getContext("2d");

      ctx.strokeStyle = this.linecolor;

      ctx.moveTo(this.lastx, this.lasty);
      ctx.lineTo(ev.touches[0].clientX, ev.touches[0].clientY);
      ctx.stroke();

      this.lastx = ev.touches[0].clientX;
      this.lasty = ev.touches[0].clientY;
    }

    ev.preventDefault(); // Eat the touch if its on the canvas
  };

  HandleMouseMove = (ev: MouseEvent) => {
    if (this.Drawing) {
      var ctx = this.TheCanvas.getContext("2d");

      ctx.strokeStyle = this.linecolor;

      ctx.moveTo(this.lastx, this.lasty);
      ctx.lineTo(ev.offsetX, ev.offsetY);
      ctx.stroke();

      this.lastx = ev.offsetX;
      this.lasty = ev.offsetY;
    }
  };

  HandleMouseDown = (ev: MouseEvent) => {
    this.Drawing = true;
    this.lastx = ev.offsetX;
    this.lasty = ev.offsetY;
  };

  HandleMouseUp = (ev: MouseEvent) => {
    this.Drawing = false;
    this.lastx = -1;
    this.lasty = -1;
  };

  GetImage() {
    return '<img src="' + this.TheCanvas.toDataURL("image/png") + '"/>';
  }
}
