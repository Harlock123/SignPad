var Signpad = /** @class */ (function () {
    function Signpad(element) {
        var _this = this;
        this.Drawing = false;
        this.lastx = -1;
        this.lasty = -1;
        this.linecolor = "#000000";
        this.backcolor = "#C0C0C0";
        this.resizeCanvas = function (ev) {
            _this.resize;
            _this.FillCanvas();
        };
        this.HandleTouchStart = function (ev) {
            _this.Drawing = true;
            _this.lastx = ev.touches[0].clientX;
            _this.lasty = ev.touches[0].clientY;
            ev.preventDefault(); // Eat the touch if its on the canvas 
        };
        this.HandleTouchEnd = function (ev) {
            _this.Drawing = false;
            _this.lastx = -1;
            _this.lasty = -1;
            ev.preventDefault(); // Eat the touch if its on the canvas
        };
        this.HandleTouchMove = function (ev) {
            if (_this.Drawing) {
                var ctx = _this.TheCanvas.getContext("2d");
                ctx.strokeStyle = _this.linecolor;
                ctx.moveTo(_this.lastx, _this.lasty);
                ctx.lineTo(ev.touches[0].clientX, ev.touches[0].clientY);
                ctx.stroke();
                _this.lastx = ev.touches[0].clientX;
                _this.lasty = ev.touches[0].clientY;
            }
            ev.preventDefault(); // Eat the touch if its on the canvas
        };
        this.HandleMouseMove = function (ev) {
            if (_this.Drawing) {
                var ctx = _this.TheCanvas.getContext("2d");
                ctx.strokeStyle = _this.linecolor;
                ctx.moveTo(_this.lastx, _this.lasty);
                ctx.lineTo(ev.offsetX, ev.offsetY);
                ctx.stroke();
                _this.lastx = ev.offsetX;
                _this.lasty = ev.offsetY;
            }
        };
        this.HandleMouseDown = function (ev) {
            _this.Drawing = true;
            _this.lastx = ev.offsetX;
            _this.lasty = ev.offsetY;
        };
        this.HandleMouseUp = function (ev) {
            _this.Drawing = false;
            _this.lastx = -1;
            _this.lasty = -1;
        };
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
    }
    ;
    Signpad.prototype.resize = function () {
        // Lookup the size the browser is displaying the canvas.
        // Make it visually fill the positioned parent
        this.TheCanvas.style.width = "100%";
        // canvas.style.height = '100%';
        // ...then set the internal size to match
        this.TheCanvas.width = this.TheCanvas.offsetWidth;
        this.TheCanvas.height = this.TheCanvas.offsetHeight;
    };
    ;
    Signpad.prototype.SetBackgroundColor = function (col) {
        this.backcolor = col;
        this.FillCanvas();
    };
    ;
    Signpad.prototype.SetDrawColor = function (col) {
        this.linecolor = col;
        this.FillCanvas();
    };
    ;
    Signpad.prototype.FillCanvas = function () {
        this.resize();
        this.ClearCanvas();
        // this.RedrawCanvas();
    };
    ;
    Signpad.prototype.ClearCanvas = function () {
        var ctx = this.TheCanvas.getContext("2d");
        ctx.fillStyle = this.backcolor;
        ctx.fillRect(0, 0, this.TheCanvas.width, this.TheCanvas.height);
        this.Drawing = false;
        this.lastx = -1;
        this.lasty = -1;
    };
    ;
    Signpad.prototype.GetImage = function () {
        return '<img src="' + this.TheCanvas.toDataURL("image/png") + '"/>';
    };
    return Signpad;
}());
//# sourceMappingURL=Signpad.js.map