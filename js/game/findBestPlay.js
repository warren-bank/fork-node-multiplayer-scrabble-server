/* See README.md at the root of this distribution for copyright and
   license information */
/* eslint-env amd */

/**
 * Calculate the best move in a Crossword game, given a dictionary,
 * a game edition, a current board state, and a player tile rack.
 * This should really be part of the 'Game' class, but is kept separate
 * because we want to be able to run it in a worker thread. Loading
 * it separately as a stand-alone function lets us both run it directly
 * or in the worker by simply changing a dependency.
 */
define("game/findBestPlay", ["game/Edition", "game/Tile", "game/Move", "dawg/Dictionary"], (Edition, Tile, Move, Dictionary) => {

	/**
	 * The entry point to this module is the 'findBestPlay' function only.
	 */
	
	// Shortcuts to game information during move computation
	let board;       // class Board
	let edition;     // class Edition
	let dict;        // Class Dictionary

	let report;      // function to call when a new best play is found, or
	                 // print a progress message or error to the console.

    let bestScore;   // best score found so far
    let crossChecks; // checks for valid words on opposite axis

	/**
	 * Unlike Appel and Jacobsen, who anchor plays on empty squares,
	 * we anchor plays on a square with a tile that has an adjacent
	 * (horizontal or vertical) non-empty square.
	 * @param col, row the square to inspect
	 * @return true if this square is a valid anchor
	 */
	function isAnchor(col, row) {
		return !board.isEmpty(col, row)
		&& (board.isEmpty(col - 1, row)
			|| board.isEmpty(col + 1, row)
			|| board.isEmpty(col, row - 1)
			|| board.isEmpty(col, row + 1));
	}

	/**
	 * Return a list of the letters that are in both arrays. Does
	 * not handle blank!
	 * @param a array of letters
	 * @param b array of letters
	 * @return intersection of a and b
	 */
	function intersection(a, b) {
		return a.filter(l => b.indexOf(l) >= 0);
	}

	/**
	 * Mainly for debug, return a list of tiles as a string.
	 * This lets us see how/if blanks have been used.
	 */
	function packRack(tiles) {
		let word = tiles.map(l => l.letter).join("");
		let blanks = tiles.map(l => l.isBlank ? ' ' : l.letter).join("");
		if (blanks != word)
			word += `/${blanks}`;
		return word;
	}

	/**
	 * Determine which letters can fit in each square and form a valid
	 * horizontal or vertical cross word. This returns a matrix where
	 * each [col][row] square has two lists, one of valid vertical
	 * chars and another of valid horizontal chars. The [0] lists give
	 * the letters that are valid for forming a vertical cross word,
	 * and the [1] lists give the letters valid for creating a
	 * horizontal cross word.  The indices are chosen such that the
	 * cells can be indexed using the dcol parameter in the other
	 * functions.
	 * @param board the Board
	 * @param available the set of available letters
	 * @return [c][r][2] the cross check letter matrix.
	 */
	function computeCrossChecks(board, available) {
		const xChecks = [];
		
		for (let col = 0; col < board.dim; col++) {
			const thisCol = [];
			xChecks.push(thisCol);
			
			for (let row = 0; row < board.dim; row++) {
				const thisCell = [[], []];
				thisCol[row] = thisCell;
				
				if (board.squares[col][row].tile) {
					// The cell isn't empty, only this letter is valid.
					thisCell[0].push(board.squares[col][row].tile.letter);
					thisCell[1].push(board.squares[col][row].tile.letter);
					continue;
				}

				// Find the words above and below
				let wordAbove = '';
				let r = row - 1;
				while (r >= 0 && board.squares[col][r].tile) {
					wordAbove = board.squares[col][r].tile.letter + wordAbove;
					r--;
				}

				let wordBelow = '';
				r = row + 1;
				while (r < board.dim && board.squares[col][r].tile) {
					wordBelow += board.squares[col][r].tile.letter;
					r++;
				}

				// Find the words left and right
				let wordLeft = '';
				let c = col - 1;
				while (c >= 0 && board.squares[c][row].tile) {
					wordLeft = board.squares[c][row].tile.letter + wordLeft;
					c--;
				}

				let wordRight = '';
				c = col + 1
				while (c != board.dim && board.squares[c][row].tile) {
					wordRight += board.squares[c][row].tile.letter;
					c++;
				}

				// Find which (if any) letters form a valid cross word
				for (let letter of available) {
					const h = wordLeft + letter + wordRight;
					
					// Is h a complete valid word, or just the letter
					// on its tod?
					const hIsWord = h.length === 1 || dict.hasWord(h);
					// Is h a valid complete word, or a legal sub-sequence?
					const hIsSeq = hIsWord || col > 0 && dict.hasSequence(h);

					const v = wordAbove + letter + wordBelow;
					const vIsWord = v.length === 1 || dict.hasWord(v);
					const vIsSeq = vIsWord || row > 0 && dict.hasSequence(v);
					
					if (hIsWord && vIsSeq)
						// A down word is playable with this letter, and
						// there's a valid down sequence involving the
						// letter
						thisCell[0].push(letter);

					if (vIsWord && hIsSeq)
						// An across word is playable with this letter, and
						// there's a valid across sequence involving the
						// letter
						thisCell[1].push(letter);
				}
			}
		}
		
		return xChecks;
	}

	/**
     * Given a position that can have a letter, recursively compute possible
     * word plays by extending down/across the board. For each word,
     * compute its point value, and update the best score
     * accordingly.
	 * 
     * @param col, row index of the current position on the board. This
	 * is the posiiton of the last character of the word constructed so far.
     * @param dcol, drow the extension direction (only one will be 1)
     * @param rackTiles tiles remaining from the user's letter rack.
	 * @param tilesPlayed number of tiles from the rack already played
	 * @param dNode the current LetterNode
	 * @param wordSoFar the known letters terminating at the dNode. List of Tile
     */
	function forward(col, row,
					 dcol, drow,
					 rackTiles, tilesPlayed,
					 dNode,
					 wordSoFar) {

		// Square we're hopefully extending into
		const ecol = col + dcol;
		const erow = row + drow;
		
		//console.log(`Extend ${pack(wordSoFar)} ${col} ${row} ${dNode.letter} ${dNode.postLetters.join("")}`);

		// Tail recurse; report words as soon as we find them
		// Are we sitting at the end of a scoring word?
		if (dNode.isEndOfWord
			&& wordSoFar.length >= 2
			&& tilesPlayed > 0
			&& (ecol == board.dim || erow == board.dim
				|| board.isEmpty(ecol, erow))) {
			const words = [];
			const score = board.scorePlay(
				col, row, dcol, drow, wordSoFar, words);
			+ (board.bonuses[tilesPlayed] || 0);
				
            if (score > bestScore) {
				bestScore = score;
                report(new Move(wordSoFar, words, score));
			}
			//else
			//	report(`Reject '${pack(wordSoFar)}' at ${col},${row} ${score}`);
		}

		let available; // list of letters that can be extended with
		let playedTile = 0;
		
		// Do we have an empty cell we can extend into?
		if (board.isEmpty(ecol, erow)) {
			const haveBlank = rackTiles.find(l => l.isBlank);
			const xc = crossChecks[ecol][erow][dcol];
			
			available = intersection(
				dNode.postLetters,
				haveBlank ? xc : intersection(rackTiles.map(t => t.letter), xc));
			playedTile = 1;
			
		} else if (ecol < board.dim && erow < board.dim)
			// Have pre-placed tile
			available = [ board.squares[ecol][erow].tile.letter ];
			
		else
			available = [];

		for (let letter of available) {
			let shrunkRack = rackTiles;
			if (playedTile > 0) {
				// Letter played from the rack
				const rackTile = shrunkRack.find(l => l.letter === letter)
					  || shrunkRack.find(l => l.isBlank);
				wordSoFar.push(
					new Tile(letter, rackTile.isBlank, rackTile.score,
							 ecol, erow));
				shrunkRack = shrunkRack.filter(t => t !== rackTile);
			} else
				wordSoFar.push(board.squares[ecol][erow].tile);

			for (let post of dNode.post) {
				if (post.letter === letter) {
					forward(ecol, erow,
							dcol, drow,
							shrunkRack, tilesPlayed + playedTile,
							post,
							wordSoFar);
				}
			}

			wordSoFar.pop();
		}
	}

	/**
     * Given a position that may be part of a word, and the letters of
	 * the word it may be part of, try to back up/left before extending
	 * down/right.
	 * 
     * @param col, row the current position on the board
     * @param dcol, drow the extension direction (only one will be 1)
     * @param rackTiles tiles remainig on the user's letter rack, list of Tile
	 * @param tilesPlayed number of tiles from the rack already played
	 * @param anchorNode the DictNode where we started backing up
	 * @param dNode the current dictionary node
     * @param wordSoFar the letters found as part of the word so far. List
	 * of Tile.
     */
    function back(col, row,
				  dcol, drow,
				  rackTiles, tilesPlayed,
				  anchorNode, dNode,
				  wordSoFar) {

		// Square we're hopefully extending into
		const ecol = col - dcol;
		const erow = row - drow;
		
		let available; // the set of possible candidate letters
		let playedTile = 0;

		//console.log(`Explore ${pack(wordSoFar)} ${col} ${row} ${dNode.letter} ${dNode.preLetters.join("")}`);
		
		// Do we have an adjacent empty cell we can back up into?
        if (board.isEmpty(ecol, erow)) {
			// Find common letters between the rack, cross checks, and
			// dNode pre.
			const haveBlank = rackTiles.find(l => l.isBlank);
			const xc = crossChecks[ecol][erow][dcol];
			
			available =
				  intersection(
					  dNode.preLetters,
					  haveBlank ? xc : intersection(
						  rackTiles.map(l => l.letter),	xc));
			playedTile = 1;
			
		} else if (erow >= 0 && ecol >= 0)
			// Non-empty square, might be able to walk back through it
			available = [ board.squares[ecol][erow].tile.letter ];
			
		else
			available = [];

		// Head recurse; longer words are more likely to
		// be high scoring, so want to find them first
		for (let letter of available) {
			let shrunkRack = rackTiles;
			if (playedTile > 0) {
				// Letter came from the rack
				const tile = shrunkRack.find(l => l.letter === letter)
					  || shrunkRack.find(l => l.isBlank);
				wordSoFar.unshift(
					new Tile(letter, tile.isBlank, tile.score,
							 ecol, erow));
				shrunkRack = shrunkRack.filter(t => t !== tile);
			} else
				// Letter already on the board
				wordSoFar.unshift(board.squares[ecol][erow].tile);

			for (let pre of dNode.pre) {
				if (pre.letter === letter) {
					back(ecol, erow,
						 dcol, drow,
						 shrunkRack, tilesPlayed + playedTile,
						 anchorNode, pre,
						 wordSoFar);
				}
			}

			wordSoFar.shift();
		}
		
		// If this is the start of a word in the dictionary, and
		// we're at the edge of the board or the prior cell is
		// empty, then we have a valid word start.
		if (dNode.pre.length == 0
			&& (erow < 0 || ecol < 0 || board.isEmpty(ecol, erow))) {
			
			// try extending down beyond the anchor, with the letters
			// that we have determined comprise a valid rooted sequence.
			forward(col + dcol * (wordSoFar.length - 1),
					row + drow * (wordSoFar.length - 1),
					dcol, drow,
					rackTiles, tilesPlayed,
					anchorNode,
					wordSoFar);
		}
	}

	/**
	 * Special case of the opening move. Find anagrams of the player's
	 * rack, and find the highest scoring position for each possible word.
	 */
	function bestOpeningPlay(rackTiles) {
		const choices = dict.findAnagrams(rackTiles.map(l => l.letter).join(""));
		// Random whether it is played across or down
		const drow = Math.round(Math.random());
		const dcol = (drow + 1) % 2;
		let bestScore = 0;
		
		for (let choice of Object.keys(choices)) {
			// Keep track of the rack and played letters
			let shrunkRack = rackTiles;
			let blankedWord = '';
			for (let c of choice.split("")) {
				const rackTile = shrunkRack.find(t => t.letter == c)
					  || shrunkRack.find(t => t.isBlank);
				placements.push(new Tile(c, rackTile.isBlank, raackTile.score));
				shrunkRack = shrunkRack.filter(t => t !== rackTile);
			}

			// Slide the word over the middle to find the optimum
			// position
			for (let end = board.middle;
				 end < board.middle + choice.length;
				 end++) {
				
				const score = board.scorePlay(
					end, board.middle, dcol, drow, placements);
				if (score > bestScore) {
					for (let i = 0; i < choice.length; i++) {
						const pos = end - choice.length + i + 1;
						placements[i].col = pos * dcol;
						placements[i].row = pos * drow;
					}
					bestScore = score;
					report(new Move(placements, score, [choice]));
				}
			}
		}
	}

	/*
	 * Given a user's letter rack, compute the best possible move.
	 * @pram game the Game
	 * @param rack rack in the form of a simple list of Tile
	 * @param listener fn() that accepts a best play whenever a new
	 * one is found, or a string containing a message
	 * @return Promise that resolves when all best moves have been identified
	 */
    function findBestPlay(game, rack, listener) {
		report = listener;
		
		if (!game.edition) {
			report("Error: Game has no edition", game);
			return Promise.reject('Game has no edition');
		}

		if (!game.dictionary) {
			report("Error: Cannot find moves with no dictionary");
			return Promise.reject('Game has no dictionary');
		}

		// sort and reverse to make sure high value letters come
		// first and blanks come last. It's not going to make it
		// any faster, but it will abort with a better result if
		// it's going to time out.
		const rackTiles = rack.sort((a, b) => {
			return a.letter < b.letter ? -1	: a.score > b.score ? 1 : 0;
		}).reverse();

		report("Finding best play for rack " + rackTiles);

		board = game.board;
		report("on board" + board );

		const preamble = [
			Dictionary.load(game.dictionary),
			Edition.load(game.edition)
		];

		return Promise.all(preamble)
		.then(de => {
			dict = de[0];
			edition = de[1];
			
			report("Starting computation");
			bestScore = 0;

			// Has at least one anchor been explored? If there are
			// no anchors, we need to compute an opening play
			let anchored = false;
			for (let col = 0; col < board.dim; col++) {
				for (let row = 0; row < board.dim; row++) {
					// An anchor is any square that has a tile and has an
					// adjacent blank that can be extended into to form a word
					if (isAnchor(col, row)) {
						if (!anchored) {
							// What letters can be used to form a valid cross
							// word? The whole alphabet if the rack contains a
							// blank, the rack otherwise.
							const available = rackTiles.find(l => l.isBlank)
								  ? edition.alphabeta
								  : (rackTiles.filter(t => !t.isBlock)
									 .map(t => t.letter));
							crossChecks = computeCrossChecks(board, available);
							anchored = true;
						}
						const anchorTile = board.squares[col][row].tile;
						const roots = dict.getSequenceRoots(anchorTile.letter);
						for (let anchorNode of roots) {
							// Try and back up then forward through
							// the dictionary to find longer sequences
							back(
								col, row,
								0, 1,
								rackTiles, 0,
								anchorNode, anchorNode,
								[ anchorTile ]);
							back(
								col, row,
								1, 0,
								rackTiles, 0,
								anchorNode, anchorNode,
								[ anchorTile ])
						}
					}
				}
			}

			if (!anchored)
				// No anchors, so this is an opening play.
				bestOpeningPlay();

		});
	}
	
	return findBestPlay;
});
