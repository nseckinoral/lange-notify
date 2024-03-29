var stage, label, bg1, bg2, bg3, bgs;

(function() {
    'use strict';

    // Create the canvas element that will become the render target.
    // EaselJS calls this a "stage".
    var containerEl = document.getElementById('container');
    var stageEl = document.createElement('canvas');
    stageEl.id = 'notification';
    stageEl.width = 992;
    stageEl.height = 100;
    containerEl.appendChild(stageEl);

    var SLANT = 20;

    // Store some important coordinates we'll be needing later.
    var midX = stageEl.width / 2;
    var maxX = stageEl.width - SLANT;
    var maxY = stageEl.height;

    // Create the stage on the target canvas, and create a ticker that will render at 60 fps.
    stage = new createjs.Stage('notification');
    createjs.Ticker.addEventListener('tick', function(event) {
        if (event.paused) return;

        bgs.forEach(function(bg) {
            // The two left side x values. Will be inverted to get right side x values.
            var tipX = Math.min(-(bg.width / 2), 0);
            var baseX = Math.min(-(bg.width / 2) + SLANT, 0);

            // Start at top left point, moves clockwise
            bg.graphics
                .clear()
                .beginFill(bg.color)
                .moveTo(baseX, 0)
                .lineTo(-baseX, 0)
                .lineTo(-tipX, maxY / 2)
                .lineTo(-baseX, maxY)
                .lineTo(baseX, maxY)
                .lineTo(tipX, maxY / 2)
                .closePath();
        });

        stage.update();
    });
    createjs.Ticker.setFPS(60);

    var bgContainer = new createjs.Container();
    stage.addChild(bgContainer);

    // Create the three background elements
    bg3 = new createjs.Shape();
    bg3.name = 'bg3';
    bg3.maxWidth = maxX;
    bg3.width = 0;
    bg3.x = midX;
    bgContainer.addChild(bg3);

    bg2 = new createjs.Shape();
    bg2.name = 'bg2';
    bg2.maxWidth = maxX - 23;
    bg2.width = 0;
    bg2.x = midX;
    bgContainer.addChild(bg2);

    bg1 = new createjs.Shape();
    bg1.name = 'bg1';
    bg1.maxWidth = maxX - 54;
    bg1.width = 0;
    bg1.x = midX;
    bgContainer.addChild(bg1);

    // Put all the background elements into an array to make the stagger tweens a bit easier to write
    bgs = [bg1, bg2, bg3];

    // Create the text element
    label = new createjs.Text('SUBSCRIBER', '800 65px proxima-nova', '#F7F2E8');
    label.x = midX;
    label.showY = 11;
    label.hideY = 0;
    label.y = label.hideY;
    label.textAlign = 'center';
    label.mask = bg1;
    label.maxWidth = bg1.maxWidth - (SLANT * 3);
    stage.addChild(label);
})();
