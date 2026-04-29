import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gameContent } from '@/lib/content-en';

interface WordSearchProps {
  onComplete?: (score: number) => void;
}

interface Cell {
  letter: string;
  found: boolean;
}

export const WordSearch: React.FC<WordSearchProps> = ({ onComplete }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Array<[number, number]>>([]);
  const [score, setScore] = useState(0);

  const wordSearchData = gameContent.wordGames.wordSearch;
  const words = wordSearchData.words;
  const gridSize = wordSearchData.gridSize;

  // Initialize grid
  useEffect(() => {
    const newGrid: Cell[][] = [];
    const usedPositions = new Set<string>();

    // Create empty grid
    for (let i = 0; i < gridSize; i++) {
      newGrid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        newGrid[i][j] = { letter: '', found: false };
      }
    }

    // Place words
    words.forEach(word => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 4); // 0: horizontal, 1: vertical, 2: diagonal, 3: diagonal
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        let canPlace = true;
        const positions: Array<[number, number]> = [];

        for (let i = 0; i < word.length; i++) {
          let r = row;
          let c = col;

          if (direction === 0) c += i; // horizontal
          else if (direction === 1) r += i; // vertical
          else if (direction === 2) {
            r += i;
            c += i;
          } // diagonal down-right
          else {
            r += i;
            c -= i;
          } // diagonal down-left

          if (r >= gridSize || c >= gridSize || c < 0) {
            canPlace = false;
            break;
          }

          const key = `${r},${c}`;
          if (usedPositions.has(key) && newGrid[r][c].letter !== word[i]) {
            canPlace = false;
            break;
          }

          positions.push([r, c]);
        }

        if (canPlace) {
          positions.forEach(([r, c], i) => {
            newGrid[r][c].letter = word[i];
            usedPositions.add(`${r},${c}`);
          });
          placed = true;
        }

        attempts++;
      }
    });

    // Fill empty cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!newGrid[i][j].letter) {
          newGrid[i][j].letter = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }

    setGrid(newGrid);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCells(prev => {
      const key = `${row},${col}`;
      const exists = prev.some(([r, c]) => r === row && c === col);

      if (exists) {
        return prev.filter(([r, c]) => !(r === row && c === col));
      } else {
        return [...prev, [row, col]];
      }
    });
  };

  const handleCheckWord = () => {
    if (selectedCells.length === 0) return;

    const selectedWord = selectedCells
      .map(([r, c]) => grid[r]?.[c]?.letter || '')
      .join('');

    const foundWord = words.find(
      word =>
        word === selectedWord ||
        word === selectedWord.split('').reverse().join('')
    );

    if (foundWord && !foundWords.has(foundWord)) {
      setFoundWords(prev => new Set(Array.from(prev).concat(foundWord)));
      setScore(prev => prev + 10);

      // Mark cells as found
      const newGrid = grid.map((row: Cell[]) => [...row]);
      selectedCells.forEach(([r, c]: [number, number]) => {
        newGrid[r][c].found = true;
      });
      setGrid(newGrid);
    }

    setSelectedCells([]);
  };

  const handleClear = () => {
    setSelectedCells([]);
  };

  const handleComplete = () => {
    if (onComplete) {
      const percentage = Math.round(
        (foundWords.size / words.length) * 100
      );
      onComplete(percentage);
    }
  };

  const progress = foundWords.size / words.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Word Search</h2>
          <p className="text-gray-600">
            Find {words.length} words related to the nervous system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200 inline-block">
              <div className="grid gap-1" style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              }}>
                {grid.map((row: Cell[], rowIdx: number) =>
                  row.map((cell: Cell, colIdx: number) => {
                    const isSelected = selectedCells.some(
                      ([r, c]) => r === rowIdx && c === colIdx
                    );
                    return (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => handleCellClick(rowIdx, colIdx)}
                        className={`w-8 h-8 flex items-center justify-center font-bold text-sm transition-all ${
                          cell.found
                            ? 'bg-green-300 text-green-900 cursor-default'
                            : isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cell.letter}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Progress:</p>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {foundWords.size} / {words.length} words
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Words Found:</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {words.map((word: string) => (
                  <div
                    key={word}
                    className={`text-sm p-2 rounded ${
                      foundWords.has(word)
                        ? 'bg-green-100 text-green-700 line-through'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Score:</p>
              <p className="text-2xl font-bold text-blue-700">{score}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={handleCheckWord}
            disabled={selectedCells.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Check Word
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="border-blue-500 text-blue-700 hover:bg-blue-50"
          >
            Clear Selection
          </Button>
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            Complete
          </Button>
        </div>
      </Card>
    </div>
  );
};
