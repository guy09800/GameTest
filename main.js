const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#1e1e1e',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 800, height: 450 },
  scene: { preload, create }
};

let goalZone, piece;

function preload() {
  this.load.image('piece', 'raydickpick.jpeg');   // 200x200 transparent png
}

function create() {
  // goal area
  goalZone = this.add.rectangle(650, 225, 180, 180, 0x2a9d8f, 0.25).setStrokeStyle(3, 0x2a9d8f);

  // draggable piece
  piece = this.add.image(200,225,'piece')
  .setInteractive({ draggable:true })
  .setScale( Math.min(180/piece.width, 180/piece.height, 1) ); 
  this.input.setDraggable(piece);

  // drag handlers (mouse + touch work the same)
  this.input.on('drag', (_p, obj, x, y) => { obj.x = x; obj.y = y; });

  // simple “one-level” win condition
  this.input.on('dragend', (_p, obj) => {
    const withinX = Math.abs(obj.x - goalZone.x) < 60;
    const withinY = Math.abs(obj.y - goalZone.y) < 60;
    if (withinX && withinY) win.call(this);
  });
}

function win() {
  this.add.text(400, 50, 'Solved', { fontFamily: 'sans-serif', fontSize: 48, color: '#ffffff' }).setOrigin(0.5);
  this.tweens.add({ targets: goalZone, alpha: 1, duration: 250 });
  localStorage.setItem('puzzle_complete', '1'); // trivial persistence
}

new Phaser.Game(config);
