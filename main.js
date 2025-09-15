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
  // adjust path to where the file actually is
  this.load.image('piece', 'assets/raydickpick.jpeg');
}

  this.load.on('loaderror', f => console.error('load error:', f?.src || f));
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
