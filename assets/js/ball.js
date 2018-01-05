function Ball (raduis, color) {
    if (raduis === undefined) { raduis = 40;}
    if (color === undefined) { color = '#ff0000';}

    this.x = 0;
    this.y = 0;
    this.raduis = raduis;
    this.rotate = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    // this.color = utils.parseColor(color);
    this.color = '#ff0000';
    this.lineWidth = 1;
}

Ball.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    
    context.arc(0, 0, this.raduis, 0, (Math.PI*2),true);
    context.closePath();
    context.fill();

    if (this.lineWidth > 0) {
        context.stroke();
    }

    context.restore();

}