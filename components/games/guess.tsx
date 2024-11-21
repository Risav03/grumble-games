'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/UI/button';
import { TextInput } from '@/components/UI/textInput';
import { Card} from '@/components/UI/card';
import { AlertCircle, Lightbulb } from 'lucide-react';

const WordGuesserGame = () => {
  const [targetWord, setTargetWord] = useState<string>('');
  const [wordLength, setWordLength] = useState<number>(5);
  const [guess, setGuess] = useState<string>('');
  const [trials, setTrials] = useState<number>(3);
  const [hints, setHints] = useState<number>(2);
  const [feedback, setFeedback] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<string>('playing');
  const [revealedLetters, setRevealedLetters] = useState<number[]>([]);

  // Word generation function (simple dictionary)
  const generateWord = (length:number) => {
    const wordList:any = {
      4: ['cats', 'dogs', 'fish', 'bird', 'frog'],
      5: ['apple', 'smile', 'stone', 'ocean', 'world'],
      6: ['create', 'engine', 'guitar', 'sunset', 'camera'],
      7: ['harmony', 'explore', 'journey', 'inspire', 'freedom']
    };

    const availableWords = wordList[length] || wordList[5];
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  // Initialize game
  const initializeGame = () => {
    const newWord = generateWord(wordLength);
    setTargetWord(newWord);
    setGuess('');
    setTrials(3);
    setHints(2);
    setFeedback('');
    setGameStatus('playing');
    setRevealedLetters([]);
  };

  // Start game on component mount
  useEffect(() => {
    initializeGame();
  }, [wordLength]);

  // Handle guess submission
  const handleGuess = () => {
    if (guess.toLowerCase() === targetWord.toLowerCase()) {
      setFeedback('Congratulations! You guessed the word!');
      setGameStatus('won');
      return;
    }

    setTrials(prev => prev - 1);
    
    if (trials <= 1) {
      setFeedback(`Game over! The word was ${targetWord}.`);
      setGameStatus('lost');
      return;
    }

    setFeedback('Incorrect guess. Try again!');
  };

  // Hint mechanism
  const useHint = () => {
    if (hints <= 0 || gameStatus !== 'playing') return;

    const unrevealedIndexes = targetWord
      .split('')
      .map((_, index) => index)
      .filter(index => !revealedLetters.includes(index));

    if (unrevealedIndexes.length === 0) return;

    const randomIndex = unrevealedIndexes[Math.floor(Math.random() * unrevealedIndexes.length)];
    setRevealedLetters(prev => [...prev, randomIndex]);
    setHints(prev => prev - 1);
  };

  // Render the word with revealed/hidden letters
  const renderWordProgress = () => {
    return targetWord
      .split('')
      .map((letter, index) => 
        revealedLetters.includes(index) ? letter : '_'
      )
      .join(' ');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">

          <h2 className="text-center">Word Guesser</h2>

        <div>
          <div className="space-y-4">
            {/* Word Length Selector */}
            <div className="flex justify-center space-x-2 mb-4">
              {[4, 5, 6, 7].map(length => (
                <Button 
                  key={length} 
                  type="secondary"
                  onClick={() => setWordLength(length)}
                  disabled={gameStatus !== 'playing'}
                >
                  {length} Letters
                </Button>
              ))}
            </div>

            {/* Word Progress */}
            <div className="text-center text-2xl font-bold tracking-widest mb-4">
              {renderWordProgress()}
            </div>

            {/* Guess Input */}
            <TextInput 
            heading='Guess'
            required={true}
              placeholder="Enter your guess" 
              content={guess}
              setContent={setGuess}
              disabled={gameStatus !== 'playing'}
            />

            {/* Game Controls */}
            <div className="flex justify-between gap-4">
              <Button 
              type='primary'
                onClick={handleGuess} 
                disabled={gameStatus !== 'playing'}
              >
                Guess
              </Button>
              <Button 
                type='secondary'
                onClick={useHint} 
                disabled={hints <= 0 || gameStatus !== 'playing'}
              >
                <Lightbulb className="mr-2" /> Hint ({hints})
              </Button>
            </div>

            {/* Feedback & Status */}
            {feedback && (
              <div className={`
                flex items-center p-3 rounded-lg
                ${gameStatus === 'won' ? 'bg-green-100' : 'bg-red-100'}
              `}>
                <AlertCircle className="mr-2" />
                <span>{feedback}</span>
              </div>
            )}

            {/* Game Status */}
            <div className="text-center">
              <p>Trials Left: {trials}</p>
            </div>

            {/* Restart Game */}
            {gameStatus !== 'playing' && (
              <Button 
                onClick={initializeGame} 
                type='text'
              >
                Start New Game
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WordGuesserGame;