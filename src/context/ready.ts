import { createContext, useContext } from 'react';

/**
 * App-readiness flag. Flips true when the preloader finishes (fonts loaded +
 * minimum display time). Above-the-fold content (the Hero) waits on this so its
 * entrance animation plays *after* the loading overlay lifts, not behind it.
 *
 * Defaults to `true` so any consumer rendered without a provider (or after the
 * preloader is removed) still animates normally.
 */
export const ReadyContext = createContext(true);

export const useReady = () => useContext(ReadyContext);
