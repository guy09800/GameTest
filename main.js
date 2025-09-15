const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#1e1e1e',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 800, height: 450 },
  scene: { preload, create }
};

let goalZone, piece;

function preload() {
  // adjust path to where the file actually is
  this.load.image('piece', 'assets/raydickpick.jpeg');
}

function create() {
  // goal area
  goalZone = this.add.rectangle(650, 225, 180, 180, 0x2a9d8f, 0.25)
    .setStrokeStyle(3, 0x2a9d8f);

  // scale to fit inside 180×180
  const src = this.textures.get('piece').getSourceImage();
  const s = Math.min(180 / src.width, 180 / src.height, 1);

  // draggable piece
  piece = this.add.image(200, 225, 'piece').setScale(s).setInteractive();
  this.input.setDraggable(piece);

  // drag handlers
  this.input.on('drag', (_p, o, x, y) => { o.x = x; o.y = y; });

  // single win condition
  this.input.on('dragend', (_p, o) => {
    if (Math.abs(o.x - goalZone.x) < 60 && Math.abs(o.y - goalZone.y) < 60) {
      this.add.text(400, 50, 'Solved', { fontFamily: 'sans-serif', fontSize: 48, color: '#fff' }).setOrigin(0.5);
      this.tweens.add({ targets: goalZone, alpha: 1, duration: 250 });
      localStorage.setItem('puzzle_complete', '1');
    }
  });
}

new Phaser.Game(config);
