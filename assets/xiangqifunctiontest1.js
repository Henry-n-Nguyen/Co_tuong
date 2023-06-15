let board = null;
let game = new Xiangqi();

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // only pick up pieces for Red
  if (piece.search(/^b/) !== -1) return false;
}

function makeRandomMove () {
  let possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) return;

  let randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}

function onDrop (source, target) {
  // see if the move is legal
  let move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  // make random legal move for black
  window.setTimeout(makeRandomMove, 250);
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen());
}

let config = {
  boardTheme: "./docs/img/xiangqiboards/wikimedia/xiangqiboard2.svg",
  pieceTheme: "./docs/img/xiangqipieces/wikimedia/{piece}.svg",
  orientation: "white",
  position: game.fen(),
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};
board = Xiangqiboard('#myBoard1', config);