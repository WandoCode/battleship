# battleship

Create a webApp that allow to play at the battleship game

## Ship module

Create a ship with a given size.
When hit, the position is put on the ship.
When hit on all his size, ship sink.

## Gameboard module

Create a board of a given dimension (nxn).
Ship can be placed on the board at a given position and direction.
Rules to put ship:

- Must be totally on the board
- Can't share one or more of his coord with another ship
- Can't 'touch' another ship

Shot can be fired on the board. When it happen, the position is tag as Fired => No shot possible there.
If a shot hit a ship:

- it return a signal
- the ship is marked as hit at that position
- the position around ('X') are taged as already Fired (no ship at that coord)

When all ship have been sunk, the board signal it.

## Player

Create a player with a name.
Player can be human or IA.
Player can fire on the enemy board. Human choose the coord and it's random for IA (but never where it's impossible for a ship to be).
