const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#1e1e1e',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 800, height: 450 },
  scene: { preload, create }
};

let goalZone, piece;

function preload() {
  this.load.on('loaderror', f => console.error('load error:', f?.src || f));
  this.load.image('piece', 'assets/raydickpick.jpeg');
}

function create() {
  goalZone = this.add.rectangle(650, 225, 180, 180, 0x2a9d8f, 0.25).setStrokeStyle(3, 0x2a9d8f);

  if (!this.textures.exists('piece')) {
    console.error('Texture "piece" missing');
    piece = this.add.circle(200, 225, 60, 0xff0000).setInteractive();
    this.input.setDraggable(piece);
    return;
  }

  const src = this.textures.get('piece').getSourceImage();
  const s = Math.min(180 / src.width, 180 / src.height, 1);

  piece = this.add.image(200, 225, 'piece').setScale(s).setInteractive();
  this.input.setDraggable(piece);

  this.input.on('drag', (_p, o, x, y) => { o.x = x; o.y = y; });

  this.input.on('dragend', (_p, o) => {
    if (Math.abs(o.x - goalZone.x) < 60 && Math.abs(o.y - goalZone.y) < 60) {
      this.add.text(400, 50, 'Solved', { fontFamily: 'sans-serif', fontSize: 48, color: '#fff' }).setOrigin(0.5);
      this.tweens.add({ targets: goalZone, alpha: 1, duration: 250 });
      localStorage.setItem('puzzle_complete', '1');
    }
  });
}

new Phaser.Game(config);
