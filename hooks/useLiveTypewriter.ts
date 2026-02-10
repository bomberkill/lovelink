import { useState, useEffect, useRef } from 'react';

interface UseLiveTypewriterOptions {
    speed?: number; // Base speed in ms per char (slower is better for emotion, e.g. 70-90)
    startDelay?: number;
    enabled?: boolean; // Control when to start typing
}

// Instruction types for the internal engine
type TypingInstruction =
    | { type: 'type'; content: string }
    | { type: 'hesitate'; wrong: string; right: string };

function parseInstructions(text: string): TypingInstruction[] {
    const instructions: TypingInstruction[] = [];
    let cursor = 0;

    while (cursor < text.length) {
        const openBracket = text.indexOf('[', cursor);

        if (openBracket === -1) {
            if (cursor < text.length) {
                instructions.push({ type: 'type', content: text.slice(cursor) });
            }
            break;
        }

        // Text before bracket
        if (openBracket > cursor) {
            instructions.push({ type: 'type', content: text.slice(cursor, openBracket) });
        }

        const closeBracket = text.indexOf(']', openBracket);
        if (closeBracket === -1) {
            // Broken syntax, treat remaining as text
            instructions.push({ type: 'type', content: text.slice(openBracket) });
            break;
        }

        const content = text.slice(openBracket + 1, closeBracket); // "wrong->right"
        const arrowIndex = content.indexOf('->');

        if (arrowIndex !== -1) {
            const wrong = content.slice(0, arrowIndex);
            const right = content.slice(arrowIndex + 2);
            instructions.push({ type: 'hesitate', wrong, right });
        } else {
            // Fallback if no arrow (just text in brackets)
            instructions.push({ type: 'type', content: `[${content}]` });
        }

        cursor = closeBracket + 1;
    }

    return instructions;
}

export function useLiveTypewriter(rawText: string, {
    speed = 70,
    startDelay = 0,
    enabled = true
}: UseLiveTypewriterOptions = {}) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    // Blinking cursor independent of typing
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(v => !v), 530);
        return () => clearInterval(interval);
    }, []);

    // Main Typing Effect
    useEffect(() => {
        if (!enabled) {
            // If disabled, reset or keep empty
            setDisplayedText('');
            setIsTyping(false);
            setIsComplete(false);
            return;
        }

        if (!rawText) return;

        let timeoutId: NodeJS.Timeout;
        let cancelled = false;

        const instructions = parseInstructions(rawText);

        // Dynamic State Context
        // We use a mutable object to track progress across recursive timeouts
        // because standard loop variables would be lost or complex to manage with variable delays.
        const ctx = {
            instrIndex: 0,
            charIndex: 0,
            currentString: '',

            // Hesitation Sub-State
            hesitationStage: 'wrong' as 'wrong' | 'pause' | 'backspace' | 'right',
            backspaceCount: 0
        };

        const loop = () => {
            if (cancelled) return;

            // 1. Check if Finished
            if (ctx.instrIndex >= instructions.length) {
                setIsTyping(false);
                setIsComplete(true);
                return;
            }

            const instr = instructions[ctx.instrIndex];
            setIsTyping(true);

            // --- A. NORMAL TYPING ---
            if (instr.type === 'type') {
                if (ctx.charIndex < instr.content.length) {
                    const char = instr.content[ctx.charIndex];
                    ctx.currentString += char;
                    ctx.charIndex++;
                    setDisplayedText(ctx.currentString);

                    // Variable Speed
                    let delay = speed + (Math.random() * speed * 0.5);
                    if (char === ' ') delay += 50;
                    if (['.', '!', '?', ','].includes(char)) delay += 400; // Punctuation pause

                    timeoutId = setTimeout(loop, delay);
                } else {
                    // Done with this block
                    ctx.instrIndex++;
                    ctx.charIndex = 0;
                    timeoutId = setTimeout(loop, speed);
                }
            }

            // --- B. HESITATION (wrong -> delete -> right) ---
            else if (instr.type === 'hesitate') {

                // Phase 1: Type Wrong Word
                if (ctx.hesitationStage === 'wrong') {
                    if (ctx.charIndex < instr.wrong.length) {
                        ctx.currentString += instr.wrong[ctx.charIndex];
                        ctx.charIndex++;
                        setDisplayedText(ctx.currentString);

                        // Type wrong word slightly faster/more impulsively
                        timeoutId = setTimeout(loop, speed * 0.8);
                    } else {
                        // Finished wrong word -> Pause for Realization
                        ctx.hesitationStage = 'pause';
                        ctx.backspaceCount = instr.wrong.length; // Number of chars to delete
                        timeoutId = setTimeout(loop, 800 + Math.random() * 400); // Thinking...
                    }
                }
                // Phase 2: Realization Pause (already waited, just transition)
                else if (ctx.hesitationStage === 'pause') {
                    ctx.hesitationStage = 'backspace';
                    loop(); // Immediate next step
                }
                // Phase 3: Backspace
                else if (ctx.hesitationStage === 'backspace') {
                    if (ctx.backspaceCount > 0) {
                        ctx.currentString = ctx.currentString.slice(0, -1);
                        ctx.backspaceCount--;
                        setDisplayedText(ctx.currentString);
                        timeoutId = setTimeout(loop, 60); // Fast delete
                    } else {
                        // Done deleting -> Pause before correction
                        ctx.hesitationStage = 'right';
                        ctx.charIndex = 0;
                        timeoutId = setTimeout(loop, 400);
                    }
                }
                // Phase 4: Type Right Word
                else if (ctx.hesitationStage === 'right') {
                    if (ctx.charIndex < instr.right.length) {
                        const char = instr.right[ctx.charIndex];
                        ctx.currentString += char;
                        ctx.charIndex++;
                        setDisplayedText(ctx.currentString);

                        // Type right word slower, more deliberately (confidence)
                        timeoutId = setTimeout(loop, speed * 1.5);
                    } else {
                        // Hesitation Complete
                        ctx.instrIndex++;
                        ctx.charIndex = 0;
                        ctx.hesitationStage = 'wrong'; // Reset for next instruction
                        timeoutId = setTimeout(loop, speed);
                    }
                }
            }
        };

        // Start
        // We only start if enabled (checked above)
        timeoutId = setTimeout(loop, startDelay);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [rawText, speed, startDelay, enabled]);

    return { displayedText, isTyping, isComplete, cursorVisible };
}
