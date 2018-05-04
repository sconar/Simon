let power = false,
  strict = false,
  started = false,
  roundCount = 0,
  playerSeq = -1,
  cpuSeq = [],
  colors = {
    g: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    r: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    b: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    y: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  };
const errSound = new Audio('https://raw.githubusercontent.com/kurumkan/simon/master/error.mp3');
const winSound = new Audio('https://raw.githubusercontent.com/kurumkan/simon/master/success.mp3');


$(document).ready(() => {
  // Power switch
  $('.togg-switch').click(() => {
        power = !power;
        if(!power) {
            $("#strictLight").removeClass("ledOn");
            strict = false;
            reset();
            screen("");
        }else{
            screen("--");
        }
        //console.log(power);
    });


  // Start button
  $('#start').click(() => {
        if(power) {
            start();
        }
    });


  // Strict button
  $('#strict').click(() => {
        if(power) {
            strict = !strict;
            $("#strictLight").toggleClass("ledOn");
        }
    });


  $('#g').mousedown('.clicks', () => {
        playerSeq=0;
        let colorG = colors.g;
        colorG.play("g");
        //console.log(colorG);
        //console.log(colorG.loop);
    });
  $('#r').mousedown('.clicks', () => {
        playerSeq=1
        duh
        colors.r.play();
    });
  $('#b').mousedown('.clicks', () => {
        playerSeq=2;
        colors.b.play();
    });
  $('#y').mousedown('.clicks', () => {
        playerSeq=3;
        colors.y.play();
    });
});


// **Sounds**   GRBY
function sound(index) {
  let id = null;
  switch (index) {
    case 0:
      id = 'g';
      break;
    case 1:
      id = 'r';
      break;
    case 2:
      id = 'b';
      break;
    case 3:
      id = 'y';
      break;
  }
  colors[id].play();
  $(`#${  id}`).addClass('fx');
  setTimeout(() => {
    $('#' + id).removeClass('fx');
  }, 400);
  // console.log(colors[id]);
}


// RNG function
function rng() {
  const generator = Math.floor(Math.random() * 4);
  cpuSeq.push(generator);
}


// Start
function start() {
  $('.simonButton').addClass('clicks');
  cpuSeq = [];
  playerSeq = -1;
  started = true;
  rng();
  sequencing();
  roundCount = 1;
  screen(roundCount);
}


// Reset
function reset() {
  started = false;
  roundCount = 0;
  cpuSeq = [];
  playerSeq = -1;
  screen('--');
  setTimeout(() => {
    $('.simonButton').removeClass('clicks');
  }, 500);
}


// CPU sequence
function cpuTurn(seq) {
  if (seq >= cpuSeq.length || !started) {
    $('.simonButton').addClass('clicks');
    return;
  }
  sound(cpuSeq[seq]);
  setTimeout(() => {
    cpuTurn(seq + 1); 
}, 800);
}


// Check playerSeq vs cpuSeq
function sequencing() {
  if (started) {
    $('.simonButton').removeClass('clicks');
    cpuTurn(0);
    playerTurn(0);
  }
}


// Player turn
function playerTurn(i) {
  if (started) {
    if (i >= cpuSeq.length) {
      roundCount++;
      screen(roundCount);
      rng();
      $('.simonButton').removeClass('clicks');
      if (roundCount === 20) {
        winner();
        return;
      }
      setTimeout(() => {
        sequencing();
      }, 1500);
      return true;
    }
    if (playerSeq < 0) {
      setTimeout(() => {
        playerTurn(i);
      }, 100);
    } else {
      const input = playerSeq;
      playerSeq = -1;
      if (input !== cpuSeq[i]) {
        screen('!!');
        errSound.play();
        $('.simonButton').removeClass('clicks');
        setTimeout(() => {
          screen(roundCount);
          $('.simonButton').addClass('clicks');
        }, 1500);
        if (strict) { setTimeout(() => {
                        start();
                    }, 1500); 
}
        else
        { 
setTimeout(() => {
                        sequencing();
                    }, 1500);
 }
        return false;
      } else if (input === cpuSeq[i]) {
        sound(input);
        setTimeout(() => {
          playerTurn(i + 1);
        }, 100);
      }
      // console.log(input);
    }
  }
}


// Display
function screen(info) {
  if (info === '') {
    $('#screen').text('');
  } else {
    info = `00${  info}`;
    info = info.substring(info.length - 2);
    $('#screen').text(info);
    setTimeout(() => {
      $('#screen').css('color', '#3d3d29');
    }, 300);
    setTimeout(() => {
      $('#screen').css('color', '#cc0000');
    }, 600);
  }
}


function winner() {
  setTimeout(() => {
    winSound.play();
  }, 500);
  screen(':)');
  $('.simonButton').addClass('clicks');
  setTimeout(() => {
    $('.simonButton').removeClass('clicks');
  }, 2000);
}
