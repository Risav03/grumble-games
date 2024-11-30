'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/UI/button';
import { TextInput } from '@/components/UI/textInput';
import { Card } from '@/components/UI/card';
import { AlertCircle, Lightbulb } from 'lucide-react';
import useSolanaNFTFetch from "@/lib/hooks/useSolanaNFTFetch"
import { useGlobalContext } from '@/context/MainContextProvider';
import axios from 'axios';
import moment from 'moment';

const WordGuesserGame = () => {
  const [targetWord, setTargetWord] = useState<string>('');
  const[hint, setHint] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [trials, setTrials] = useState<number>(3);
  const [hints, setHints] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<string>('playing');
  const [revealedLetters, setRevealedLetters] = useState<number[]>([]);
  const { NFTs } = useSolanaNFTFetch();

  const[day, getDay] = useState<number>(0);

  const { publicKey, user, leaderboard } = useGlobalContext();

  useEffect(()=>{
    const date = new Date();
    getDay(date.getDate());
  },[])

  useEffect(() => {
    if (NFTs) {
      // @ts-ignore
      setTrials(prev => prev + Math.floor(NFTs?.length / 10))
    }
  }, [NFTs])


  const generateWord = async () => {
    const res = await axios.get("/api/getWord");
    const word = res.data.word;
    setHint(res.data.hint);
    return word;
  };

  const initializeGame = async () => {
    const newWord = await generateWord();
    setTargetWord(newWord);
    

    let i = Math.floor(newWord.length/3);
    let j = 0;
    
    while(i>0){

      const unrevealedIndexes = newWord
      .split('')
      .map((_:any, index:any) => index)
      .filter((index:any) => !revealedLetters.includes(index));
      
      const randomIndex = unrevealedIndexes[Math.floor(j)];
      setRevealedLetters(prev => [...prev, randomIndex]);
      j=j+4;
      i--;
    }

    setGuess('');
    setTrials(3);
    setHints(Math.floor(newWord.length / 3));
    setFeedback('');
    setGameStatus('playing');
  };

  useEffect(() => {
    // @ts-ignore
    if (NFTs)
      initializeGame();
  }, [NFTs]);


  const handleGuess = () => {
    if (guess.toLowerCase() === targetWord.toLowerCase()) {
      setFeedback('Congratulations! You guessed the word!');
      axios.patch("/api/user/update/" + publicKey.toString(), {points: Math.round((0.5*trials)*100*(0.25*targetWord.length))});
      setGameStatus('won');
      setTimeout(()=>{window.location.reload();},1000)
      
      return;
    }

    setTrials(prev => prev - 1);

    if (trials <= 1) {
      setFeedback(`Game over! The word was ${targetWord}.`);
      axios.patch("/api/user/update/" + publicKey.toString(), {points: 0});
      setGameStatus('lost');
      setTimeout(()=>{window.location.reload();},1000)

      return;
    }

    setFeedback('Incorrect guess. Try again!');
  };

  // Hint mechanism
  const useHint = () => {
    if (hints <= 0) return;

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

  function show(date: any) {
    const millis = Number(new Date(date));
    return Date.now()>millis
  }

  return (
    <div className="">
      {!publicKey && <h2>Connect wallet to guess!</h2>}
      {publicKey && <>
        {show(user?.nextGuess) ? <>
          <Card className="w-[20rem] max-w-md">

            <h2 className="text-center text-white mb-5">Word Guesser</h2>


            <div>
              <div className="space-y-4">

                {/* Word Progress */}
                <div className="text-center text-2xl font-bold tracking-widest mb-4">
                  {renderWordProgress()}
                </div>
            <p className='text-sm text-center my-4 text-slate-500'>{hint}</p>

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
                    <AlertCircle className={` ${gameStatus === 'won' ? 'text-green-500' : 'text-red-500'}  mr-2 `} />
                    <span className={` ${gameStatus === 'won' ? 'text-green-500' : 'text-red-500'} `}>{feedback}</span>
                  </div>
                )}

                {/* Game Status */}
                <div className="text-center">
                  <p>Trials Left: {trials}</p>
                  {/* @ts-ignore */}
                  <p>(including {Math.floor(NFTs?.length / 10)} bonus trials)</p>
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
        </> : <>
        {/* @ts-ignore */}
        <p className='text-center'>Next Guess: {moment(user.nextGuess).calendar()}</p>
        </>}
      </>}

      {leaderboard.time == day && <div className='text-white flex items-center justify-center flex-col mt-5'>
        Today's first guess by <span className='bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-700 bg-clip-text text-transparent'>{leaderboard.walletId}</span>
      </div>}

    </div>
  );
};

export default WordGuesserGame;