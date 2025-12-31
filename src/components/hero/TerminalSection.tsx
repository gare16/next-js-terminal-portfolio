"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useTheme } from "@/context/ThemeProvider";
import { GetIntroText, PROMPT, TERMINAL_CONFIG } from "@/lib/constants";
import { createCommandsTheme } from "@/lib/ChangeTheme";
import { useCommands } from "@/lib/Commands";
import { createCommandsGoTo } from "@/lib/CommandGoTo";

export default function TerminalSection() {
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const { theme, setTheme } = useTheme();
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const THEMES = createCommandsTheme(setTheme);

  const INTRO_TEXT = GetIntroText();
  const COMMANDS = useCommands();

  const PATHNAME = createCommandsGoTo();

  useEffect(() => {
    if (!termRef.current) return;

    switch (theme) {
      case "dark":
        termRef.current.options.theme = {
          background: "#09090b",
          foreground: "#ffffff",
          cursor: "#ff2056",
          selectionBackground: "#ffccd9",
        };
        break;
      case "light":
        termRef.current.options.theme = {
          background: "#ffffff",
          foreground: "#09090b",
          cursor: "#ff2056",
          selectionBackground: "#ffccd9",
        };
        break;
      case "neon":
        termRef.current.options.theme = {
          background: "#000000",
          foreground: "#39ff14", // neon green text
          cursor: "#ff00ff", // neon magenta cursor
          selectionBackground: "#00ffff30",
        };
        break;
    }
  }, [theme]);

  useEffect(() => {
    if (!terminalContainerRef.current) return;

    const term = new Terminal({
      ...TERMINAL_CONFIG,
      scrollback: 2000,
      scrollOnUserInput: true,
      theme:
        theme === "dark" || theme !== "light"
          ? {
              background: "#09090b",
              foreground: "#ffffff",
              cursor: "#ff2056",
              cursorAccent: "#ff2056",
              selectionBackground: "#ffccd9",
              red: "#ff2056",
            }
          : {
              background: "#ffffff",
              foreground: "#09090b",
              cursor: "#ff2056",
              cursorAccent: "#ff2056",
              selectionBackground: "#ffccd9",
              red: "#ff2056",
            },
    });
    term.options.linkHandler = {
      activate: (event, uri) => {
        window.open(uri, "_blank");
      },
    };

    term.open(terminalContainerRef.current);
    termRef.current = term;
    term.focus();

    let buffer = "";
    const history: string[] = [];
    let historyIndex = -1;

    const writePrompt = () => {
      term.write("\r\n" + PROMPT);
      buffer = "";
      term.scrollToBottom();
    };

    const renderBuffer = () => {
      // Clear current line (ANSI: \r + ESC[K)
      term.write("\x1b[2K\r" + PROMPT);

      if (!buffer) return;

      const [cmd] = buffer.split(" ");
      const isValid = Boolean(COMMANDS[cmd as keyof typeof COMMANDS]);

      if (isValid) {
        term.write("\x1b[32m" + buffer + "\x1b[0m"); // hijau
      } else {
        term.write("\x1b[31m" + buffer + "\x1b[0m"); // merah
      }
    };

    const typeIntro = () => {
      let i = 0,
        j = 0;
      const typeNext = async () => {
        if (i < INTRO_TEXT.length) {
          if (j < INTRO_TEXT[i].length) {
            term.write(INTRO_TEXT[i][j]);
            j++;
            setTimeout(typeNext, 10);
          } else {
            term.write("\r\n");
            i++;
            j = 0;
            const delay = INTRO_TEXT[i - 1] === "" ? 200 : 600;
            setTimeout(typeNext, delay);
          }
        } else {
          setTimeout(() => {
            writePrompt();
            setIsIntroComplete(true);
            enableUserInput();
            term.focus();
          }, 500);
        }
      };
      typeNext();
    };

    const enableUserInput = () => {
      term.onData((data) => {
        const code = data.charCodeAt(0);

        // ENTER
        if (code === 13) {
          term.write("\r\n");
          const cmd = buffer.trim();

          if (cmd) {
            history.push(cmd);
            if (history.length > 50) history.shift();
          }

          handleCommand(cmd);
          historyIndex = -1;
          return;
        }

        // BACKSPACE
        if (code === 127) {
          if (buffer.length > 0) {
            buffer = buffer.slice(0, -1);
            renderBuffer();
          }
          return;
        }

        // ArrowUp
        if (data === "\x1b[A") {
          if (history.length > 0) {
            if (historyIndex === -1) historyIndex = history.length - 1;
            else if (historyIndex > 0) historyIndex--;

            buffer = history[historyIndex];
            renderBuffer();
          }
          return;
        }

        // ArrowDown
        if (data === "\x1b[B") {
          if (historyIndex !== -1) {
            if (historyIndex < history.length - 1) {
              historyIndex++;
              buffer = history[historyIndex];
            } else {
              historyIndex = -1;
              buffer = "";
            }
            renderBuffer();
          }
          return;
        }

        // Karakter yang bisa diketik
        if (
          data >= String.fromCharCode(32) &&
          data <= String.fromCharCode(126)
        ) {
          buffer += data;
          renderBuffer();
        }
      });
    };

    const handleCommand = async (cmdLine: string) => {
      const [command, ...args] = cmdLine.split(" ");
      const value = COMMANDS[command as keyof typeof COMMANDS];
      const themes = THEMES[command as keyof typeof THEMES];
      const path = PATHNAME[command as keyof typeof PATHNAME];
      const argument = args.join(" ");
      let output: string | undefined;

      if (command === "clear") {
        term.clear();
        writePrompt();
        return;
      }

      if (command.trim() === "") {
        writePrompt();
        return;
      }

      if (themes) {
        output = typeof themes === "function" ? await themes(args) : themes;
      } else if (value) {
        output = typeof value === "function" ? value(argument) : value;
      } else if (path) {
        output = typeof path === "function" ? await path(args) : path;
      } else {
        output = `command not found: \x1b[31m${command}\x1b[0m`;
      }

      if (output) {
        const lines = output.split("\n");
        let i = 0;
        const typeLines = () => {
          if (i < lines.length) {
            term.writeln(lines[i]);
            term.scrollToBottom();
            i++;
            setTimeout(typeLines, 10);
          } else {
            writePrompt();
          }
        };
        typeLines();
      }
    };

    typeIntro();

    return () => {
      if (termRef.current) {
        termRef.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full rounded-xl flex max-w-2xl min-h-64 border border-gray-700 flex-col shadow-lg shadow-primary overflow-hidden relative font-mono text-sm bg-background"
      role="region"
      aria-label="Interactive Terminal"
    >
      {/* Terminal header */}
      <div
        className="bg-background left-0 w-full h-8 flex items-center px-3 gap-2 border-b border-gray-700 z-20"
        aria-hidden="true"
      >
        <span className="w-3 h-3 rounded-full bg-red-500" aria-label="Close button"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500" aria-label="Minimize button"></span>
        <span className="w-3 h-3 rounded-full bg-green-500" aria-label="Maximize button"></span>
        <span className="ml-3 text-gray-400 text-xs tracking-wide">
          garee.pro
        </span>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalContainerRef}
        className="pt-8 w-full h-full text-start"
        style={{
          padding: "0.5rem",
          boxSizing: "border-box",
          overflow: "auto", // ✅ scroll aktif
        }}
        onClick={() => {
          if (termRef.current && isIntroComplete) {
            termRef.current.focus();
          }
        }}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      />

      {/* Overlay untuk mencegah interaksi selama intro */}
      {!isIntroComplete && (
        <div
          className="absolute inset-0 bg-transparent z-10"
          aria-hidden="true"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}
