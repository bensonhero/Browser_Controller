var game = new Phaser.Game(700, 400, Phaser.AUTO, 'phaser-example', {preload:preload, create: create, render: render });

function preload() {
    game.load.spritesheet('button_A', 'assets/button_sprite_A.png', 120, 120);
    game.load.spritesheet('button_B', 'assets/button_sprite_B.png', 120, 120);
    game.load.spritesheet('button_C', 'assets/button_sprite_C.png', 70, 70);
    game.load.spritesheet('button_Up', 'assets/button_sprite_u.png', 100, 100);
    game.load.spritesheet('button_Down', 'assets/button_sprite_d.png', 100, 100);
    game.load.spritesheet('button_Left', 'assets/button_sprite_l.png', 100, 100);
    game.load.spritesheet('button_Right', 'assets/button_sprite_r.png', 100, 100);
    game.load.spritesheet('button_Joystick', 'assets/button_joystick.png', 100, 100);
}

var buttonjaw;
var buttonhit;
var buttonup;
var buttondown;
var buttonleft;
var buttonright;
var hold_u = 0;
var hold_d = 0;
var hold_l = 0;
var hold_r = 0;
var movedir_h = 0;
var movedir_v = 0;
var movechange = false;

function create() {

    game.stage.backgroundColor = '#454645';
    buttonjaw = game.add.button(380 , 130, 'button_A', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonjaw.events.onInputDown.add(function(){sendAction('Apressed');});
    buttonjaw.events.onInputUp.add(function(){sendAction('Areleased');});

    buttonhit = game.add.button(530, 130, 'button_B', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonhit.events.onInputDown.add(function(){sendAction('Bpressed');});
    buttonhit.events.onInputUp.add(function(){sendAction('Breleased');});

    buttonhit = game.add.button(380 ,10, 'button_C', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonhit.events.onInputDown.add(function(){sendAction('Cpressed');});
    buttonhit.events.onInputUp.add(function(){sendAction('Creleased');});

    buttonup = game.add.button(150, 50, 'button_Up', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonup.events.onInputDown.add(function(){hold_u = 1; movechange = true;});
    buttonup.events.onInputUp.add(function(){hold_u = 0;movechange = true;});

    buttonright = game.add.button(260, 130, 'button_Right', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonright.events.onInputDown.add(function(){hold_r = 1;movechange = true;});
    buttonright.events.onInputUp.add(function(){hold_r = 0;movechange = true;});

    buttondown = game.add.button(150, 210, 'button_Down', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttondown.events.onInputDown.add(function(){hold_d = -1;movechange = true;});
    buttondown.events.onInputUp.add(function(){hold_d = 0;movechange = true;});

    buttonleft = game.add.button(40, 130, 'button_Left', null, this, 0,0,1,0 );  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonleft.events.onInputDown.add(function(){hold_l = -1;movechange = true;});
    buttonleft.events.onInputUp.add(function(){hold_l = 0;movechange = true;});

}

function render() {
    if(movechange){
        sendMovement(hold_r+hold_l, hold_u+hold_d);
        movechange = false;
    }
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    senddata(1);

}